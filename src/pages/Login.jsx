import React, { useState, useEffect } from "react";
import logo from "/logomarca.png";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { FloatingLabel, Form, Modal, Button as BsButton } from "react-bootstrap";
import CustomModal from "../components/CustomModal";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [emailCpf, setEmailCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [modal, setModal] = useState({ show: false, type: "info", message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(emailCpf, senha);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("dataUser", JSON.stringify(response.data));
        navigate("/home");
      } else {
        setModal({
          show: true,
          type: "error",
          message: "Erro desconhecido.",
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
    <Styled.LoginPage>
      <Styled.Container>
        {/* Painel com imagem rotativa */}
        <Styled.LeftPanel>
          <Styled.FadeBackground
            key="fade-bg"
            image="https://img.freepik.com/free-photo/flat-lay-office-stationery-with-notebook-copy-space_23-2148524840.jpg"
            visible={true}
          />
        </Styled.LeftPanel>

        {/* Painel do formulário */}
        <Styled.RightPanel>
          <Styled.Logo src={logo} alt="logo" />

          <form className="w-100" style={{ maxWidth: "250px" }} onSubmit={handleLogin}>
            <Styled.CustomFloating as={FloatingLabel} controlId="emailCpf" label="Email ou CPF" className="mb-3">
              <Form.Control
                type="text"
                placeholder="CPF"
                name="emailCpf"
                value={emailCpf}
                onChange={(e) => setEmailCpf(e.target.value)}
                required
              />
            </Styled.CustomFloating>

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

            <div className="text-center mb-3">
              <Styled.Link href="/reset-password">Esqueci minha senha</Styled.Link>
            </div>

            <hr className="my-4 border-light" />

            <Styled.Button type="submit" disabled={loading || !emailCpf || !senha}>
              {loading ? <><FaSpinner className="spin me-2" /> Entrando...</> : "Login"}
            </Styled.Button>

            <div className="text-center mt-3">
              <Styled.Link href="/register">Não tem cadastro? Registre-se aqui!</Styled.Link>
            </div>
          </form>

          <CustomModal
            show={modal.show}
            type={modal.type}
            message={modal.message}
            onHide={() => setModal({ ...modal, show: false })}
          />
        </Styled.RightPanel>
      </Styled.Container>
    </Styled.LoginPage >
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

  CustomModal: styled(Modal)`
    .modal-content {
      background-color: #1c1c1c;
      color: white;
      border-radius: 12px;
      border: none;
      padding: 1.5rem;
    }
    .modal-header {
      border-bottom: none;
      padding-bottom: 0;
    }
    .modal-footer {
      border-top: none;
      padding-top: 0.5rem;
      justify-content: center;
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
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    transition: opacity 1.2s ease-in-out;
    z-index: 1;
  `,

  ToggleSenha: styled.button`
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.placeholder};
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  `,

  Logo: styled.img`
    max-width: 265px;
    display: block;
    margin: 0 auto 1rem auto;
  `,

  LoginPage: styled.div`
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
    background-color: ${({ theme }) => theme.colors.primaryDark};
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

  Input: styled.input`
    background-color: ${({ theme }) => theme.colors.inputBg};
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
    color: ${({ theme }) => theme.colors.text};
    padding: 0.75rem;
    border-radius: 4px;
    width: 100%;
    &::placeholder {
      color: ${({ theme }) => theme.colors.placeholder};
    }
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
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

  Link: styled.a`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.875rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.primaryDark};
    }
  `,
};