import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { FloatingLabel, Form, Modal, Button as BsButton } from "react-bootstrap";
import CustomModal from "../components/CustomModal";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

export default function NewPasswordReset() {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [modal, setModal] = useState({ show: false, type: "info", message: "" });
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleConfirmAction = () => {
    navigate("/");
  };

  const handleSendNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!token) {
      console.error("Token não encontrado!");
      return;
    }

    try {
      const response = await sendNewPassword(confirmarSenha, token);
      if (response.status === 200) {
        setModal({
          show: true,
          type: "success",
          message: "Sua senha foi alterada com sucesso!.",
        });
      }
    } catch (error) {
      const mensagemErro = error?.response?.data?.message || "Erro ao conectar com o servidor.";
      setModal({
        show: true,
        type: "error",
        message: mensagemErro,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Styled.ResetPage>
      <Styled.Container>
        {/* Painel com imagem rotativa */}
        <Styled.LeftPanel>
          {backgroundImages.map((image, idx) => (
            <Styled.FadeBackground key={idx} image={image} visible={idx === imageIndex} />
          ))}
        </Styled.LeftPanel>

        {/* Painel do formulário */}
        <Styled.RightPanel>
          <Styled.Logo src={logo} alt="logo" />
          <Styled.Title>Crie sua Nova Senha!</Styled.Title>
          <form className="w-100" style={{ maxWidth: "350px" }} onSubmit={handleSendNewPassword}>
            {/* Campo de Senha */}
            <div className="mb-3">
              <div style={{ position: "relative" }}>
                <Styled.CustomFloating as={FloatingLabel} controlId="senha" label="Senha" className="mb-3">
                  <Form.Control
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Senha"
                    name="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                    title="A senha deve ter no mínimo 8 caracteres, incluindo letra, número e caractere especial."
                  />
                </Styled.CustomFloating>
                <Styled.ToggleSenha
                  type="button"
                  onClick={() => setMostrarSenha((prev) => !prev)}
                >
                  {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                </Styled.ToggleSenha>
              </div>
            </div>

            {/* Campo de Confirmar Senha */}
            <div className="mb-3">
              <div style={{ position: "relative" }}>
                <Styled.CustomFloating as={FloatingLabel} controlId="confirmarSenha" label="Confirmar Senha" className="mb-3">
                  <Form.Control
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Confirmar Senha"
                    name="confirmarSenha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    required
                  />
                </Styled.CustomFloating>
                <Styled.ToggleSenha
                  type="button"
                  onClick={() => setMostrarSenha((prev) => !prev)}
                >
                  {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                </Styled.ToggleSenha>
              </div>
            </div>

            <hr className="my-4 border-light" />

            {/* Botão Enviar */}
            <Styled.Button type="submit" disabled={loading || !senha || senha !== confirmarSenha}>
              {loading ? <><FaSpinner className="spin me-2" /> Enviando...</> : "Enviar"}
            </Styled.Button>
          </form>
        </Styled.RightPanel>
      </Styled.Container>

      {/* Modal de feedback */}
      <CustomModal
        show={modal.show}
        type={modal.type}
        message={modal.message}
        onHide={() => setModal({ ...modal, show: false })}
        onConfirm={handleConfirmAction}
      />
    </Styled.ResetPage>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    flex-direction: row;
  `,

  Title: styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1.5rem;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 1.75rem;
    }
  `,

  FadeBackground: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ image, theme }) => `
      linear-gradient(${theme.colors.primaryTransparent1}, ${theme.colors.primaryTransparent2}),
      url(${image})
    `};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    transition: opacity 1.2s ease-in-out;
    z-index: 1;
  `,

  Logo: styled.img`
    max-width: 265px;
    display: block;
    margin: 0 auto 1rem auto;
  `,

  ResetPage: styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
  `,

  LeftPanel: styled.div`
    flex: 2.8;
    position: relative;
    height: 100%;
    overflow: hidden;

    @media (max-width: 767px) {
      display: none;
    }
  `,

  RightPanel: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(12, 51, 8);
    padding: 2rem 1rem;
    height: 100%;

    @media (min-width: 768px) {
      max-width: 600px;
      padding: 3rem 2rem;
    }
  `,

  CustomFloating: styled.div`
    .form-control {
      background-color: ${({ theme }) => theme.colors.inputBg};
      border: 1px solid ${({ theme }) => theme.colors.inputBorder};
      color: ${({ theme }) => theme.colors.text};
      padding: 0.8rem 0.75rem;
      border-radius: 4px;

      &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: none;
      }
    }

    label {
      color: ${({ theme }) => theme.colors.placeholder};
    }

    .form-control:focus ~ label {
      color: ${({ theme }) => theme.colors.primary};
    }
  `,

  ToggleSenha: styled.button`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
  `,

  Button: styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    color: #FFF;
    border: none;
    padding: 0.75rem;
    border-radius: 4px;
    width: 100%;
    font-weight: bold;
    transition: background-color 0.3s ease;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.primaryDark};
      cursor: not-allowed;
      opacity: 0.6;
    }
  `,
};
