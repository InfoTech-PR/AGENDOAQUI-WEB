import React from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

const ContactModal = ({ show, onHide }) => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/554196801186", "_blank");
  };

  const handleEmail = () => {
    window.location.href = "mailto:paulo@infotech-solucoes.com";
  };

  return (
    <StyledModal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro enviado para aprovação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Entre em contato com a Infotech para confirmar seu cadastro dentro do sistema.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <StyledButton variant="success" onClick={handleWhatsApp}>
          <FaWhatsapp className="me-2" /> Enviar via WhatsApp
        </StyledButton>
        <StyledButton variant="primary" onClick={handleEmail}>
          <FaEnvelope className="me-2" /> Enviar via E-mail
        </StyledButton>
      </Modal.Footer>
    </StyledModal>
  );
};

export default ContactModal;

const StyledModal = styled(Modal)`
  .modal-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    margin: auto;
  }

  .modal-content {
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    text-align: center;
  }

  .modal-footer {
    justify-content: center;
    gap: 12px;
  }
`;

const StyledButton = styled(Button)`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
`;
