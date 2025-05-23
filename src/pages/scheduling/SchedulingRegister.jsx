import MainLayout from "../../layouts/MainLayout";
import styled from "styled-components";
import { CustomDateInput, CustomHourInput, CustomModal, CustomSelect, CustomInput, CustomButton } from "../../components"; 
import { useState, useEffect } from "react";
import { getAllClientsByBusiness } from "../../services/clients";
import { getAllServicesByBusiness } from "../../services/services";
import { registerScheduling } from "../../services/schedulings";
import { useNavigate } from "react-router-dom";

export default function SchedulingRegister() {
  const storedUser = JSON.parse(localStorage.getItem("dataUser") || "{}");
  const businessId = storedUser.user.id;
  const [formData, setFormData] = useState({ date: "", hour: "", serviceId: "", clientId: "", businessId: "", obs: "" });
  const isFormIncomplete = !formData.date.trim() || !formData.hour.trim() || !formData.serviceId.trim() || !formData.clientId.trim();
  const [modal, setModal] = useState({ show: false, type: "info", message: "" });
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchData() {
      try {
        const servicesResponse = await getAllServicesByBusiness(businessId);
        console.log(servicesResponse)
        const clientsResponse = await getAllClientsByBusiness(businessId);
        setServices(servicesResponse);
        setClients(clientsResponse);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    }
    fetchData();
  }, []);

  function parseLocalDate(dateStr) {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function isDateTimeBeforeNow(dateStr, hourStr) {
    if (!dateStr || !hourStr) return false;
    const [hours, minutes] = hourStr.split(":").map(Number);
    const dateTime = parseLocalDate(dateStr);
    dateTime.setHours(hours, minutes, 0, 0);
    const now = new Date();
    return dateTime < now;
  }
  
  function handleChange(e) {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
  
    if (newFormData.date && newFormData.hour) {
      if (isDateTimeBeforeNow(newFormData.date, newFormData.hour)) {
        setModal({
          show: true,
          type: "error",
          message: "Você não pode marcar agendamentos com datas e horas retroativas!",
        });
        return;
      }
    }
  
    setFormData(newFormData);
  }

  async function submitData(e) {
    e.preventDefault();
    setLoading(true);

    const formDataReal = {
        ...formData,
        businessId: businessId,
    };

    try {
      const response = await registerScheduling(formDataReal);
      setModal({
        show: true,
        type: "success",
        message: response.data.message,
      });
      navigate('/agendamentos')
    } catch (error) {
      console.log(error);
      setModal({
        show: true,
        type: "error",
        message: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <MainLayout>
      <Styled.Container>
        <Styled.Title>Realizar Novo Agendamento</Styled.Title>
        
        <form onSubmit={submitData}>
          <Styled.Line>
            <CustomDateInput
              label="Data Inicial"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

            <CustomHourInput
              label="Hora"
              name="hour"
              value={formData.hour}
              onChange={handleChange}
            />
          </Styled.Line>

          <Styled.Line>
            <CustomSelect
              options={services.map(s => ({ label: s.name, value: s.id }))}
              label="Serviço"
              name="serviceId"
              placeholder="Selecione o Serviço"
              value={formData.serviceId}
              onChange={(e) => {
                setFormData({ ...formData, serviceId: e.target.value });
              }}
            />

            <CustomSelect
              options={clients.map(c => ({ label: c.name, value: c.id }))}
              label="Cliente"
              name="clientId"
              placeholder="Selecione o cliente"
              value={formData.clientId}
              onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
            />
          </Styled.Line>

          <CustomInput
            label="Observações"
            name="obs"
            value={formData.obs}
            onChange={handleChange}
          />

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <CustomButton variant="error" onClick={() => {navigate("/agendamentos");}}>
              Cancelar
            </CustomButton>

            <CustomButton type="submit" loading={loading} disabled={isFormIncomplete}>
              Confirmar
            </CustomButton>
          </div>
        </form>
      </Styled.Container>
      <CustomModal
        show={modal.show}
        type={modal.type}
        message={modal.message}
        onHide={() => setModal({ ...modal, show: false })}
      />
    </MainLayout>
  );
}

const Styled = {
  Container: styled.div`
    max-width: 900px;
    margin: auto;
  `,

  Title: styled.h2`
    margin-bottom: 1rem;
  `,

  Line: styled.div`
    display: flex;
    gap: 1rem; 
    align-items: flex-start;

    > * {
      flex: 1;
    }
      
    @media (max-width: 768px) {
      flex-direction: column;
    }
  `,
};
