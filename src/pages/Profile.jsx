import React, { useState, useRef, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import styled from "styled-components";
import { FloatingLabel, Form as BsForm, Modal, Button as BsButton } from "react-bootstrap";
import CustomModal from "../components/CustomModal";

export default function Profile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ show: false, type: "info", message: "" });
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("dataUser");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser.user);
            setName(parsedUser.user.name);
            setEmail(parsedUser.user.email);
            setCpf(parsedUser.user.cpf);
            setProfileImage(parsedUser.user.image ? `${import.meta.env.VITE_BASE_URL_PROFILE}/${parsedUser.user.image}` : null);
            setUserId(parsedUser.user.id);
        }
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                uploadImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const data = {
            id: userId,
            name,
            email,
            oldPassword,
            newPassword,
            profileImage,
        };

        try {
            await updateUser(data);

            const storedUser = localStorage.getItem("dataUser");
            const parsedUser = storedUser ? JSON.parse(storedUser) : {};
            parsedUser.user = { ...parsedUser.user, ...data };
            localStorage.setItem("dataUser", JSON.stringify(parsedUser));

            setModal({
                show: true,
                type: "success",
                message: "Seus dados foram alterados com sucesso!.",
            });
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

    if (!user) {
        return <MainLayout>Carregando...</MainLayout>;
    }

    return (
        <MainLayout>
            <h1>Meus Dados</h1>
            <StyledForm onSubmit={handleSubmit}>
                {/* Campo de imagem */}
                <ImageField>
                    <ProfileImage
                        src={profileImage || "/user.png"}
                        alt="Imagem de Perfil"
                        onClick={handleImageClick}
                    />
                    <ImageInput
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                </ImageField>

                {/* Nome */}
                <CustomFloating as={FloatingLabel} controlId="name" label="Nome" className="mb-3">
                    <BsForm.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite seu nome"
                    />
                </CustomFloating>

                {/* Email */}
                <CustomFloating as={FloatingLabel} controlId="email" label="Email" className="mb-3">
                    <BsForm.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                </CustomFloating>

                {/* CPF */}
                <CustomFloating as={FloatingLabel} controlId="cpf" label="CPF" className="mb-3">
                    <BsForm.Control
                        value={cpf}
                        type="text"
                        disabled
                    />
                </CustomFloating>

                {showPasswordFields && (
                    <>
                        {/* Senha Antiga */}
                        <CustomFloating as={FloatingLabel} controlId="oldPassword" label="Senha Antiga" className="mb-3">
                            <BsForm.Control
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Digite sua senha antiga"
                                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                                title="A senha deve ter no mínimo 8 caracteres, incluindo letra, número e caractere especial."
                            />
                        </CustomFloating>

                        {/* Nova Senha */}
                        <CustomFloating as={FloatingLabel} controlId="newPassword" label="Nova Senha" className="mb-3">
                            <BsForm.Control
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Digite sua nova senha"
                                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                                title="A senha deve ter no mínimo 8 caracteres, incluindo letra, número e caractere especial."
                            />
                        </CustomFloating>
                    </>
                )}

                <ButtonContainer>
                    <Button
                        type="button"
                        onClick={() => {
                            setShowPasswordFields(!showPasswordFields);
                            setNewPassword("");
                            setOldPassword("");
                        }}
                    >
                        {showPasswordFields ? "Cancelar Senha" : "Editar Senha"}
                    </Button>

                    <SubmitButton type="submit" disabled={loading || (oldPassword && !newPassword)}>Atualizar Perfil</SubmitButton>
                </ButtonContainer>
            </StyledForm>

            {/* Modal de feedback */}
            <CustomModal
                show={modal.show}
                type={modal.type}
                message={modal.message}
                onHide={() => setModal({ ...modal, show: false })}
            />
        </MainLayout>
    );
}

const CustomFloating = styled.div`
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

        &:disabled {
            background-color: ${({ theme }) => theme.colors.disabledBg}; 
            border-color: ${({ theme }) => theme.colors.disabledBorder}; 
            color: ${({ theme }) => theme.colors.disabledText}; 
            cursor: not-allowed;
        }
    }

    label {
        color: ${({ theme }) => theme.colors.placeholder};
    }

    .form-control:focus ~ label {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ImageField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer; 
`;

const ImageInput = styled.input`
  display: none; 
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  justify-content: center;  /* Centraliza horizontalmente */
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #218838;
  }
        &:disabled {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    cursor: not-allowed;
    opacity: 0.6;
    }
`;
