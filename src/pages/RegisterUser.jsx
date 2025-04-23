import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FloatingLabel, Form, Modal, Button as BsButton } from 'react-bootstrap';

export default function RegisterUser() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", cpf: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const isFormIncomplete = Object.entries(formData)
        .filter(([key]) => key !== "phone" && key !== "email")
        .some(([, value]) => !value.trim());

    const cleanCpf = (cpf) => cpf.replace(/\D/g, ''); // Remove tudo que não for número
    const cleanPhone = (phone) => phone.replace(/\D/g, ''); // Remove tudo que não for número

    const formatPhone = (value) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 11);

        const match = cleaned.match(/^(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})$/);
        if (!match) return cleaned;

        const [, ddd, first, middle, last] = match;
        let formatted = '';
        if (ddd) formatted += `(${ddd}`;
        if (ddd && ddd.length === 2) formatted += ') ';
        if (first) formatted += first;
        if (middle) formatted += ' ' + middle;
        if (last) formatted += '-' + last;

        return formatted.trim();
    };

    const handlePhoneChange = (e) => {
        const formatted = formatPhone(e.target.value);
        setFormData({ ...formData, phone: formatted });
    };

    const formatCpf = (value) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 11);
        const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);

        if (!match) return cleaned;
        const [, part1, part2, part3, part4] = match;

        let formatted = '';
        if (part1) formatted += part1;
        if (part2) formatted += '.' + part2;
        if (part3) formatted += '.' + part3;
        if (part4) formatted += '-' + part4;

        return formatted;
    };

    const handleCpfChange = (e) => {
        const formatted = formatCpf(e.target.value);
        setFormData({ ...formData, cpf: formatted });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        if (!formData.email.trim() && !formData.phone.trim()) {
            setErrors({ general: "Informe pelo menos um email ou telefone." });
            setLoading(false);
            return;
        }

        if (formData.phone.replace(/\D/g, '').length !== 11 && formData.phone.replace(/\D/g, '').length > 0) {
            setErrors({ phone: "O telefone deve ter 11 dígitos (DDD + número)." });
            setLoading(false);
            return;
        }

        if (formData.cpf.replace(/\D/g, '').length !== 11 && formData.cpf.replace(/\D/g, '').length > 0) {
            setErrors({ cpf: "O cpf deve ter 11 dígitos." });
            setLoading(false);
            return;
        }

        const cleanFormData = {
            ...formData,
            cpf: cleanCpf(formData.cpf), // CPF limpo
            phone: cleanPhone(formData.phone), // Telefone limpo
        };

        try {
            const response = await registerUser(cleanFormData);

            if (response.status === 201) {
                navigate("/");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'Erro inesperado ao tentar registrar. Tente novamente mais tarde.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Styled.RegisterPage>
            <Styled.Container>
                {/* Painel com imagem rotativa */}
                <Styled.LeftPanel>
                    <Styled.FadeBackground
                        key="fade-bg"
                        image="https://img.freepik.com/free-photo/flat-lay-office-stationery-with-notebook-copy-space_23-2148524840.jpg"
                        visible={true}
                    />
                </Styled.LeftPanel>
                <Styled.RightPanel>
                    <Styled.Title>Registre-se!</Styled.Title>
                    <form className="w-100" style={{ maxWidth: "320px" }} onSubmit={handleSubmit}>
                        <Styled.CustomFloating as={FloatingLabel} controlId="name" label="Nome" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Nome"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            {errors.name && <Styled.ErrorMsg>{errors.name}</Styled.ErrorMsg>}
                        </Styled.CustomFloating>

                        <Styled.CustomFloating as={FloatingLabel} controlId="email" label="Email" className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="E-mail"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            />
                            {errors.email && <Styled.ErrorMsg>{errors.email}</Styled.ErrorMsg>}
                        </Styled.CustomFloating>

                        <Styled.CustomFloating as={FloatingLabel} controlId="phone" label="Telefone" className="mb-3">
                            <Form.Control
                                type="tel"
                                placeholder="Telefone"
                                name="phone"
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                disabled
                            />
                            {errors.phone && <Styled.ErrorMsg>{errors.phone}</Styled.ErrorMsg>}
                        </Styled.CustomFloating>

                        <Styled.CustomFloating as={FloatingLabel} controlId="cpf" label="CPF" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="CPF"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleCpfChange}
                                required
                            />
                            {errors.cpf && <Styled.ErrorMsg>{errors.cpf}</Styled.ErrorMsg>}
                        </Styled.CustomFloating>

                        <Styled.InputWrapper className="mb-3">
                            <Styled.CustomFloating as={FloatingLabel} controlId="password" label="Senha" className="mb-3">
                                <Form.Control
                                    type={mostrarSenha ? "text" : "password"}
                                    placeholder="Senha"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                                    title="A senha deve ter no mínimo 8 caracteres, incluindo letra, número e caractere especial."
                                />
                                {errors.password && <Styled.ErrorMsg>{errors.password}</Styled.ErrorMsg>}
                            </Styled.CustomFloating>
                            <Styled.ToggleSenha
                                type="button"
                                onClick={() => setMostrarSenha((prev) => !prev)}
                            >
                                {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                            </Styled.ToggleSenha>
                        </Styled.InputWrapper>

                        <Styled.Button type="submit" disabled={loading || isFormIncomplete}>
                            {loading ? <><FaSpinner className="spin me-2" /> Criando...</> : "Criar Conta"}
                        </Styled.Button>

                        {errors.general && (<Styled.ErrorMsg className="text-center mt-2">{errors.general}</Styled.ErrorMsg>)}

                        <div className="text-center mt-3">
                            <Styled.Link href="/">Já tenho uma conta</Styled.Link>
                        </div>
                    </form>
                    {/* Modal de erro */}
                    <Styled.CustomModal show={showModal} onHide={() => setShowModal(false)} centered>
                        <Styled.ModalContent>
                            <h5>Erro ao fazer login</h5>
                            <p>Verifique seu e-mail/CPF e senha e tente novamente.</p>
                            <BsButton variant="danger" onClick={() => setShowModal(false)}>
                                Fechar
                            </BsButton>
                        </Styled.ModalContent>
                    </Styled.CustomModal>
                </Styled.RightPanel>
            </Styled.Container>
        </Styled.RegisterPage>
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

    RegisterPage: styled.div`
        min-height: 100vh;
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

    ModalContent: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        h5 {
            font-size: 1.25rem;
            color: #ff4d4d;
            margin-bottom: 0.25rem;
        }

        p {
            font-size: 0.95rem;
            text-align: center;
            margin: 0;
            color: #ccc;
        }

        button {
            padding: 0.5rem 1.5rem;
            font-weight: bold;
            border-radius: 8px;
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

    InputWrapper: styled.div`
        position: relative;
    `,

    CustomFloating: styled.div`
        .form-control {
            background-color: ${({ theme }) => theme.colors.inputBg};
            border: 1px solid ${({ theme }) => theme.colors.inputBorder};
            color: ${({ theme }) => theme.colors.text};
            padding: 0.5rem 0.6rem;
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

    Button: styled.button`
        background-color: ${({ theme }) => theme.colors.primary};
        color: #FFF;
        border: none;
        padding: 0.5rem;
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
        font-size: 0.85rem;
        text-decoration: none;

        &:hover {
        text-decoration: underline;
        color: ${({ theme }) => theme.colors.primaryDark};
        }
    `,

    ErrorMsg: styled.span`
        display: block;
        color: #ff4d4d;
        font-size: 0.75rem;
        margin-top: 0.25rem;
    `,
};
