import styled from "styled-components";
import { useState, useEffect } from "react";
import { CustomModal, PhoneInput, CustomInput, CustomButton, CustomLink, CustomSelect } from "../../components";
import { registerBusiness } from "../../services/business";
import { useLocation } from "react-router-dom";

export default function RegisterBusinessSocial() {
    const location = useLocation();
    const [formData, setFormData] = useState({ name: "", category: "", email: "", phone: "", user: "", password: "remover isso daqui depois", token: "" });
    const [loading, setLoading] = useState(false);
    const [isGoogleOrFacebookLogin, setIsGoogleOrFacebookLogin] = useState(false);
    const { userData } = location.state || {};
    const isFormIncomplete = !formData.name.trim() || !formData.category.trim() || !formData.user.trim() || (!formData.email.trim() && !formData.phone.trim());
    const [modal, setModal] = useState({ show: false, type: "info", message: "" });
    const sanitizePhone = (phone) => phone.replace(/\D/g, '');

    useEffect(() => {
        if (userData) {
            setFormData((prev) => ({
                ...prev,
                email: userData.email || '',
                phone: userData.phone || '',
                user: userData.name || '',
                token: userData.token || '',
            }));
            setIsGoogleOrFacebookLogin(true);
        }
    }, [userData]);

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
        };

        try {
            const response = await registerBusiness(sanitizedData);
            setModal({
                show: true,
                type: "success",
                message: response.data.message,
            });
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
        <Styled.RegisterPage>
            <Styled.Container>
                <Styled.LeftPanel/>
                <Styled.RightPanel>
                    <Styled.Title>Cadastre-se!</Styled.Title>
                    <Styled.Text>Cadastre suas informações para promover seu negócio na nossa plataforma.</Styled.Text>

                    <form onSubmit={submitData}>
                        <CustomInput
                            label="Nome"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <CustomSelect
                            options={[{ label: "Opção 1", value: "1" }, { label: "Opção 2", value: "2" }, { label: "Opção 3", value: "3" }]}
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            loading={loading}
                            variant="primary"
                        />

                        <CustomInput
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isGoogleOrFacebookLogin}
                        />

                        <PhoneInput
                            label="Telefone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={isGoogleOrFacebookLogin}
                        />

                        <CustomInput
                            label="Usuário"
                            name="user"
                            value={formData.user}
                            onChange={handleChange}
                            required
                            disabled={isGoogleOrFacebookLogin} 
                        />

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <CustomButton type="submit" loading={loading} disabled={isFormIncomplete}>
                                Cadastrar
                            </CustomButton>
                        </div>

                        <hr className="my-4 border-light" />

                        <CustomLink href="/login-negocios">Seu Negócio já está cadastrado? Entre Aqui!</CustomLink>
                    </form>
                    <CustomModal
                        show={modal.show}
                        type={modal.type}
                        message={modal.message}
                        onHide={() => setModal({ ...modal, show: false })}
                    />
                </Styled.RightPanel>
            </Styled.Container>
        </Styled.RegisterPage>
    );
}

const Styled = {
    RegisterPage: styled.div`
      height: 100vh;
      display: flex;
      flex-direction: column;
    `,

    Container: styled.div`
      flex: 1;
      display: flex;
      flex-direction: row;
      height: 100%;
    `,

    LeftPanel: styled.div`
      flex: 7;
      background: url('/logomarca-dark.png') center center no-repeat;
      background-size: 80%;
      display: none;

      @media (min-width: 768px) {
        display: block;
      }
    `,

    RightPanel: styled.div`
      background-color: ${({ theme }) => theme.colors.primaryLight};
      flex: 3;
      padding: 2rem;
      overflow-y: auto;
    `,

    Title: styled.h2`
      text-align: left;
      margin-bottom: 1rem;
      color: ${({ theme }) => theme.colors.link};
    `,

    Text: styled.p`
        font-size: 1rem;
        color: ${({ theme }) => theme.colors.linkHover}; 
        text-align: left;
        margin-bottom: 1.5rem;
    `,
};
