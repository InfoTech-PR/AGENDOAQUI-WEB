import MainLayout from "../../layouts/MainLayout";
import styled from "styled-components";
import { CustomDateInput, CustomHourInput, CustomModal, CustomSelect, CustomInput, CustomButton } from "../../components"; 
import { useState, useEffect } from "react";
import { getAllClientsByBusiness } from "../../services/clients";
import { getAllServicesByBusiness } from "../../services/services";
import { updateScheduling, getSchedulingById, createSchedulingCancel } from "../../services/schedulings";
import { useNavigate, useParams } from "react-router-dom";

export default function SchedulingDetails() {
  const { id } = useParams();
  const storedUser = JSON.parse(localStorage.getItem("dataUser") || "{}");
  const userId = storedUser.user.id;
  const [formData, setFormData] = useState({ date: "", hour: "", serviceId: "", clientId: "", businessId: "", observations: "" });
  const requiredFields = ["date", "hour", "serviceId", "clientId"];
  const [modal, setModal] = useState({ show: false, type: "info", message: "", onConfirm: null, onCancel: null });
  const [cancelReasonModal, setCancelReasonModal] = useState({ show: false, reason: "" });
  const [successModal, setSuccessModal] = useState({ show: false, message: "" });
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [reload, setReload] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [originalScheduling, setOriginalScheduling] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isEditing) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isEditing]);

  useEffect(() => {
    async function fetchData() {
      try {
        const schedulingResponse = await getSchedulingById(id);
        setOriginalScheduling(schedulingResponse);
        const servicesResponse = await getAllServicesByBusiness(schedulingResponse.businessId);
        const clientsResponse = await getAllClientsByBusiness(schedulingResponse.businessId);
        setFormData(schedulingResponse);
        setServices(servicesResponse);
        setClients(clientsResponse);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    }
    fetchData();
  }, [id, reload]);

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

  function handleConfirm() {
    const emptyRequiredFields = requiredFields.filter(field => !formData[field] || formData[field] === "");

    if (emptyRequiredFields.length > 0) {
      setModal({
        show: true,
        type: "warning",
        message:
          "Um campo obrigatório foi deixado em branco! O sistema irá manter o dado cadastrado anteriormente para esse campo e salvar as demais alterações. Deseja manter ou continuar editando?",
        onConfirm: keepPreviousData,
        onCancel: () => setModal({ ...modal, show: false }),
      });
      return;
    }
    // Se passou, salva direto
    submitDataDirect();
  }
  
  function submitData(e) {
    e.preventDefault();
    handleConfirm();
  }

  function keepPreviousData() {
    const updatedData = { ...formData };

    requiredFields.forEach(field => {
      if (!formData[field] || formData[field] === "") {
        updatedData[field] = originalScheduling[field];
      }
    });

    setFormData(updatedData);
    setModal({ ...modal, show: false });

    submitDataDirect(updatedData);
  }

  async function submitDataDirect(data = formData) {
    setLoading(true);
    try {
      await updateScheduling(data);
      setIsEditing(false);
      navigate("/agendamentos");
    } catch (error) {
      setModal({
        show: true,
        type: "error",
        message: error.response?.data?.message || "Erro ao salvar agendamento.",
      });
    } finally {
      setLoading(false);
    }
  }

  function cancelEdition() {
    setIsEditing(false);
    setFormData(originalScheduling);
  }

  function registerCancelation() {
    setModal({ show: false, type: "info", message: "" }); 
    setCancelReasonModal({ show: true, reason: "" });
  }

  function cancelScheduling() {
    setModal({
      show: true,
      type: "warning",
      message: "Tem certeza que deseja cancelar este Agendamento?",
      onConfirm: registerCancelation,
      onCancel: () => setModal({ show: false, type: "info", message: "", onConfirm: null, onCancel: null }),
    });
  }

  function closeSuccessModal() {
    setSuccessModal({ show: false, message: "" });
    navigate("/agendamentos");
  }

  async function confirmCancelScheduling() {
    setLoading(true);
    try {
      await createSchedulingCancel({
        schedulingId: id,
        cancelledById: userId,
        cancelledByType: "business",
        cancelDescription: cancelReasonModal.reason,
      });
  
      setCancelReasonModal({ show: false, reason: "" });
  
      setSuccessModal({
        show: true,
        message: "O Agendamento foi cancelado com sucesso",
      });
    } catch (error) {
      setModal({
        show: true,
        type: "error",
        message: error.response?.data?.message || "Erro ao cancelar agendamento.",
      });
    } finally {
      setLoading(false);
    }
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
              disabled={!isEditing}
              onChange={handleChange}
            />

            <CustomHourInput
              label="Hora"
              name="hour"
              value={formData.hour}
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
            />
          </Styled.Line>

          <CustomInput
            label="Observações"
            name="observations"
            value={formData.observations}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </form>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>

        </div>
        
        {!isEditing ? (
          <Styled.Actions>
            <CustomButton variant="error" onClick={cancelScheduling}>
              Cancelar Agendamento
            </CustomButton>

            <CustomButton onClick={() => { setIsEditing(true) }}>
              Editar Agendamento
            </CustomButton>
          </Styled.Actions>
        ) : (
          <Styled.Actions>
            <CustomButton onClick={cancelEdition} disabled={isConfirming} variant="error">
              Cancelar
            </CustomButton>
            <CustomButton onClick={handleConfirm} disabled={isConfirming} variant="success">
              {isConfirming ? "Salvando..." : "Confirmar"}
            </CustomButton>
          </Styled.Actions>
        )}
      </Styled.Container>
      <CustomModal
          show={modal.show}
          type={modal.type}
          message={modal.message}
          onConfirm={modal.onConfirm}
          onCancel={modal.onCancel}
          onHide={() => setModal({ show: false, type: "info", message: "", onConfirm: null, onCancel: null })}
          confirmText={modal.onConfirm ? "Sim" : undefined}
          cancelText={modal.onCancel ? "Não" : "Fechar"}
      />
      {/* Modal para motivo do cancelamento */}
      {cancelReasonModal.show && (
        <CustomModal
          show={true}
          type="warning"
          message={
            <>
              <p>Informe o motivo do cancelamento (opcional):</p>
              <textarea
                style={{ width: "100%", height: "100px", resize: "none" }}
                value={cancelReasonModal.reason}
                onChange={(e) => setCancelReasonModal({ ...cancelReasonModal, reason: e.target.value })}
              />
            </>
          }
          onConfirm={confirmCancelScheduling}
          onCancel={() => setCancelReasonModal({ show: false, reason: "" })}
          confirmText="Confirmar"
          cancelText="Cancelar"
        />
      )}

      {/* Modal de sucesso */}
      {successModal.show && (
        <CustomModal
          show={true}
          type="success"
          message={successModal.message}
          onConfirm={closeSuccessModal}
          confirmText="Ok"
        />
      )}
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

  Actions: styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
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
