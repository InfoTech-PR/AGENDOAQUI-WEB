import styled from "styled-components";
import { useState } from "react";
import { CustomModal, PasswordInput, CustomInput, CustomButton, CustomLink } from "../../components";
import { auth, googleProvider, facebookProvider, signInWithPopup } from "../../utils/firebase";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { loginBusiness } from "../../services/business";
import { useNavigate } from 'react-router-dom'

export default function LoginBusiness() {
	const [formData, setFormData] = useState({ email: "", password: "", token: "" });
	const [loading, setLoading] = useState(false);
	const isFormIncomplete = !formData.password.trim() || (!formData.email.trim());
	const [modal, setModal] = useState({ show: false, type: "info", message: "" });
	const navigate = useNavigate();

	function handleChange(e) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	}

	async function submitData(e) {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await loginBusiness(formData.email, formData.password, null);
			const { token, user } = response.data;
			
			localStorage.setItem('dataUser', JSON.stringify({ token, user }));
			navigate('/');
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

	async function handleGoogleLogin() {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			const firebaseUser = result.user;
			const tokenId = await firebaseUser.getIdToken();
			
			const response = await loginBusiness(firebaseUser.email, null, tokenId);
			const { token, user } = response.data;
			
			localStorage.setItem('dataUser', JSON.stringify({ token, user }));
			navigate('/');
		} catch (error) {
			console.error("Erro no login com Google:", error);
			setModal({
				show: true,
				type: "error",
				message: error.response?.data?.message || error.message || "Erro desconhecido",
			});
		}
	}
	
	async function handleFacebookLogin() {
		try {
			const result = await signInWithPopup(auth, facebookProvider);
			const firebaseUser = result.user;
			const tokenId = await firebaseUser.getIdToken();
			
			const response = await loginBusiness(firebaseUser.email, null, tokenId);
			const { token, user } = response.data;
			
			localStorage.setItem('dataUser', JSON.stringify({ token, user }));
			navigate('/');
		} catch (error) {
			console.error("Erro no login com Facebook:", error);
			setModal({
				show: true,
				type: "error",
				message: error.response.data.message,
			});
		}
	}
		
	return (
			<Styled.RegisterPage>
					<Styled.Container>
							<Styled.LeftPanel/>
							<Styled.RightPanel>
									<Styled.Title>Entre!</Styled.Title>
									<Styled.Text>Informe o usuário e senha do seu negócio para entrar na Central do Negócio</Styled.Text>

									<form onSubmit={submitData}>
											<CustomInput
													label="Email"
													name="email"
													value={formData.email}
													onChange={handleChange}
											/>

											<PasswordInput
													label="Senha"
													name="password"
													value={formData.password}
													onChange={handleChange}
													required
											/>

											<div style={{ display: "flex", justifyContent: "center" }}>
													<CustomButton type="submit" loading={loading} disabled={isFormIncomplete}>
															Entrar
													</CustomButton>
											</div>

											<Styled.SocialButtons>
													<CustomButton onClick={handleFacebookLogin}>
															<FaFacebook /> Facebook
													</CustomButton>
													<CustomButton onClick={handleGoogleLogin}>
															<FaGoogle /> Google
													</CustomButton>
											</Styled.SocialButtons>

											<hr className="my-4 border-light" />

											<CustomLink href="/registro-negocios">
													É novo aqui?<br/>
													Cadastre Seu Negócio!
											</CustomLink>
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

	ErrorMsg: styled.p`
		color: red;
		font-size: 0.875rem;
		margin-top: -0.5rem;
		margin-bottom: 0.75rem;
	`,

	SocialButtons: styled.div`
			display: flex;
			flex-direction: row;
			justify-content: center;
			gap: 1rem;
			margin: 1rem 0;
	
			button {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 8px;
			}
	`,
};