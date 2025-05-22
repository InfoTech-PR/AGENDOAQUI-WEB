import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { CustomModal, PhoneInput, CustomDateInput, CustomInput, CustomButton } from "../../components";
import { registerClient } from "../../services/clients";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function ClientRegister() {
  const storedUser = JSON.parse(localStorage.getItem("dataUser") || "{}");
  const id = storedUser.user.id;
  const [formData, setFormData] = useState({ name: "", dob: "", email: "", phone: "", businessId: "" });
  const [loading, setLoading] = useState(false);
  const isFormIncomplete = !formData.name.trim() || (!formData.email.trim() && !formData.phone.trim());
  const [modal, setModal] = useState({ show: false, type: "info", message: "" });
  const navigate = useNavigate();
  const sanitizePhone = (phone) => phone.replace(/\D/g, '');
  const [showBackConfirm, setShowBackConfirm] = useState(false);
  
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function submitData(e) {
    e.preventDefault();
    setLoading(true);
    
    const sanitizedData = {
        ...formData,
      phone: sanitizePhone(formData.phone),
      businessId: id,
    };

    try {
      const response = await registerClient(sanitizedData);
      setModal({
          show: true,
          type: "success",
          message: response.data.message,
      });
      navigate('/clientes')
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

  function backToListPage() {
    setShowBackConfirm(true);
  }

  function confirmBack() {
    setShowBackConfirm(false);
    navigate("/clientes");
  }

  return (
    <MainLayout>
      <Styled.Container>
        <Styled.Title>Cadastro de Cliente</Styled.Title>

        <form onSubmit={submitData}>
          <CustomInput
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <CustomDateInput
            label="Data de Nascimento"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />

          <PhoneInput
            label="Telefone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <CustomInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <CustomButton variant="error" onClick={backToListPage}>
              Cancelar
            </CustomButton>
            <CustomButton variant="success" type="submit" loading={loading} disabled={isFormIncomplete}>
              Confirmar
            </CustomButton>
          </div>
        </form>

        <CustomModal
          show={showBackConfirm}
          type="warning"
          message="Tem certeza que deseja voltar? As informações preenchidas serão perdidas."
          onConfirm={confirmBack}
          onHide={() => setShowBackConfirm(false)}
        />
        <CustomModal
          show={modal.show}
          type={modal.type}
          message={modal.message}
          onHide={() => setModal({ ...modal, show: false })}
        />
      </Styled.Container>
    </MainLayout>
  );
}

const Styled = {
  Container: styled.div`
    padding: 2rem;
    font-family: sans-serif;
    max-width: 600px;
    margin: 0 auto;

    @media (max-width: 768px) {
      padding: 1rem;
    }

    label {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }

    small {
      color: red;
      font-size: 0.8rem;
    }
  `,

  Title: styled.h2`
    text-align: left;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text};
  `,
};