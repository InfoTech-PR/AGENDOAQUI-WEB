import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainLayout from "../../layouts/MainLayout";
import { useLocation } from 'react-router-dom';
import { FaPhone, FaFacebookF, FaTwitter, FaEnvelope, FaInstagram, FaWhatsapp, FaStar } from 'react-icons/fa';

export default function InitialBusiness() {
	const [user, setUser] = useState(null);
	const [userLocation, setUserLocation] = useState(null);
	const [loading, setLoading] = useState(true);
	const { state } = useLocation();
	const service = state?.service;
	
	const [services, setServices] = useState([
		{
			id: 1,
			name: "Corte de Cabelo",
			price: "R$ 40,00",
			duration: "30 min",
			description: "Corte profissional com tesoura e máquina.",
			imageUrl: "https://via.placeholder.com/150"
		},
		{
			id: 2,
			name: "Barba",
			price: "R$ 25,00",
			duration: "20 min",
			description: "Barba feita com navalha e toalha quente.",
			imageUrl: "https://via.placeholder.com/150"
		},
		{
			id: 3,
			name: "Massagem",
			price: "R$ 80,00",
			duration: "60 min",
			description: "Massagem relaxante para alívio do estresse.",
			imageUrl: "https://via.placeholder.com/150"
		}
	]);

	const [search, setSearch] = useState("");

	const filteredServices = services.filter(service =>
	service.name.toLowerCase().includes(search.toLowerCase())
	);

	useEffect(() => {
	const storedUser = localStorage.getItem("dataUser");
	if (storedUser) {
		const parsedUser = JSON.parse(storedUser);
		setUser(parsedUser.user);
	}
	}, []);

	useEffect(() => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
		(position) => {
			const coords = {
			lat: position.coords.latitude,
			lon: position.coords.longitude
			};
			setUserLocation(coords);
			setLoading(false);
		},
		(error) => {
			setUserLocation("error");
			setLoading(false);
			console.error("Erro ao obter localização:", error.message);
		}
		);
	} else {
		console.warn("Geolocalização não suportada pelo navegador.");
		setLoading(false);
	}
	}, []);

	const mockSchedule = {
		Monday: { open: "08:00", close: "18:00" },
		Tuesday: { open: "08:00", close: "18:00" },
		Wednesday: { open: "08:00", close: "18:00" },
		Thursday: { open: "08:00", close: "18:00" },
		Friday: { open: "08:00", close: "18:00" },
		Saturday: { open: "10:00", close: "14:00" },
		Sunday: null 
	};

	const reviews = [
		{
			userImage: 'https://example.com/user1.jpg',
			userName: 'João Silva',
			date: '2025-05-07',
			service: 'Corte de cabelo',
			comment: 'Ótimo serviço, adorei o atendimento!',
			rating: 5,
		},
		{
			userImage: 'https://example.com/user2.jpg',
			userName: 'Maria Oliveira',
			date: '2025-05-06',
			service: 'Manicure',
			comment: 'Excelente qualidade, vou voltar sempre!',
			rating: 4,
		},
	];
	
	function isOpenToday(schedule) {
		const now = new Date();
		const day = now.toLocaleDateString("en-US", { weekday: "long" });
		const hours = now.getHours();
		const minutes = now.getMinutes();
		const currentMinutes = hours * 60 + minutes;

		const todaySchedule = schedule[day];
		if (!todaySchedule) return { open: false, day };

		const [openH, openM] = todaySchedule.open.split(":").map(Number);
		const [closeH, closeM] = todaySchedule.close.split(":").map(Number);
		const openMinutes = openH * 60 + openM;
		const closeMinutes = closeH * 60 + closeM;

		return {
			open: currentMinutes >= openMinutes && currentMinutes <= closeMinutes,
			day
		};
	}

	const schedule = mockSchedule;
	const { open: isOpenNow, day: today } = isOpenToday(schedule);

  return (
    <MainLayout>
			<Styled.Body>
				
        <Styled.BusinesSection>
          <Styled.Image src={service.imageUrl} alt={service.name} />
          <Styled.Info>
            <h1>{service.name}</h1>
            <p><strong>Categoria:</strong> {service.category}</p>
            <p><strong>⭐</strong> {service.rating}</p>
            <p><strong>Agendamentos:</strong> {service.bookings}</p>
            <p><strong>Descrição:</strong> {service.description}</p>
          </Styled.Info>
        </Styled.BusinesSection>

			<Styled.LocationSection>
				<Styled.Title>Localização</Styled.Title>
				<Styled.LocationSectionContent>
					<Styled.InfoLocation>
						<p><strong>Distância:</strong> {service.distance} km</p>
						<p><strong>Endereço:</strong> {service.address}</p>
					</Styled.InfoLocation>
					<Styled.Map
						src={`https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}Y&center=${service.lat},${service.lon}&zoom=15`}
						allowFullScreen
						loading="lazy"
					/>
				</Styled.LocationSectionContent>
			</Styled.LocationSection>
				
				<Styled.HourbusinesSection>
					<h2>Horários de Funcionamento</h2>
					<table>
						<thead>
							<tr>
								<th>Dia</th>
								<th>Abertura</th>
								<th>Fechamento</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{Object.entries(schedule).map(([day, hours]) => {
								const isToday = day === today;
								const open = hours?.open || "-";
								const close = hours?.close || "-";
								const status = !hours
									? "Fechado"
									: isToday && isOpenNow
									? "Aberto"
									: "Fechado";

								return (
									<tr key={day} className={isToday ? "highlight" : ""}>
										<td>{day}</td>
										<td>{open}</td>
										<td>{close}</td>
										<td className={status === "Aberto" ? "open" : "closed"}>{status}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</Styled.HourbusinesSection>

				<Styled.ServicesSection>
					<h2>Serviços</h2>
					<input
						type="text"
						placeholder="Buscar serviço..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>

					<div className="cards">
						{filteredServices.map(service => (
							<div className="card" key={service.id}>
								<img src={service.imageUrl} alt={service.name} />
								<div className="info">
									<h3>{service.name}</h3>
									<p><strong>Valor:</strong> {service.price}</p>
									<p><strong>Duração:</strong> {service.duration}</p>
									<p className="desc">{service.description}</p>
									<button>Agendar</button>
								</div>
							</div>
						))}
					</div>
				</Styled.ServicesSection>

				<Styled.PaymentSection>
					<h2>Formas de Pagamento</h2>
					<div className="options">
						<div className="card">
							<img src="/icons/credit-card.svg" alt="Crédito" />
							<span>Crédito</span>
						</div>
						<div className="card">
							<img src="/icons/debit-card.svg" alt="Débito" />
							<span>Débito</span>
						</div>
						<div className="card">
							<img src="/icons/pix.svg" alt="Pix" />
							<span>Pix</span>
						</div>
						<div className="card">
							<img src="/icons/cash.svg" alt="Dinheiro" />
							<span>Dinheiro</span>
						</div>
					</div>
				</Styled.PaymentSection>

				<Styled.TeamSection>
				<h2>Equipe</h2>
				<Styled.TeamGrid>
					{[
					{
						image: 'https://via.placeholder.com/150',
						name: 'João Silva',
						role: 'Barbeiro',
						description: 'Especialista em cortes modernos e atendimento personalizado.',
					},
					{
						image: 'https://via.placeholder.com/150',
						name: 'Maria Costa',
						role: 'Cabeleireira',
						description: 'Trabalha com coloração e alisamento há mais de 10 anos.',
					},
					].map((member, index) => (
					<Styled.Card key={index}>
						<img src={member.image} alt={member.name} />
						<h3>{member.name}</h3>
						<h4>{member.role}</h4>
						<p>{member.description}</p>
					</Styled.Card>
					))}
				</Styled.TeamGrid>
				</Styled.TeamSection>
				
				<Styled.ContactSection>
					<Styled.ContactRow>
						<Styled.ContactItem as="a" href="tel:11999999999">
							<FaPhone /> <span>(11) 99999-9999</span>
						</Styled.ContactItem>
						<Styled.ContactItem as="a" href="https://www.facebook.com/?locale=pt_BR">
							<FaFacebookF /> <span>Facebook</span>
						</Styled.ContactItem>
						<Styled.ContactItem as="a" href="https://x.com/?lang=pt">
							<FaTwitter /> <span>Twitter</span>
						</Styled.ContactItem>
					</Styled.ContactRow>

					<Styled.ContactRow>
						<Styled.ContactItem as="a" href="mailto:contato@exemplo.com">
							<FaEnvelope /> <span>contato@exemplo.com</span>
						</Styled.ContactItem>
						<Styled.ContactItem as="a" href="https://www.instagram.com/">
							<FaInstagram /> <span>Instagram</span>
						</Styled.ContactItem>
						<Styled.ContactItem as="a" href="https://wa.me/5511999999999">
							<FaWhatsapp /> <span>WhatsApp</span>
						</Styled.ContactItem>
					</Styled.ContactRow>
				</Styled.ContactSection>
				
				<Styled.ReviewsSection>
					<Styled.Title>Avaliações</Styled.Title>

					<Styled.Stats>
						<Styled.Rating>
						<FaStar /> {4.5} estrelas
						</Styled.Rating>
						<Styled.Bookings>
						{120} Agendamentos concluídos
						</Styled.Bookings>
					</Styled.Stats>

					<Styled.ReviewCards>
						{reviews.map((review, index) => (
						<Styled.ReviewCard key={index}>
							<Styled.UserDetails>
							<Styled.UserImage src={review.userImage} alt={review.userName} />
							<Styled.UserInfo>
								<Styled.UserName>{review.userName}</Styled.UserName>
								<Styled.ReviewDate>{review.date}</Styled.ReviewDate>
								<Styled.Service>{review.service}</Styled.Service>
							</Styled.UserInfo>
							</Styled.UserDetails>
							<Styled.Comment>{review.comment}</Styled.Comment>
							<Styled.RatingStars>
							{Array(review.rating).fill(<FaStar />)}
							</Styled.RatingStars>
						</Styled.ReviewCard>
						))}
					</Styled.ReviewCards>
					</Styled.ReviewsSection>
      </Styled.Body>
    </MainLayout>
  );
}

const Styled = {
	Body: styled.main`
		padding: 2rem;
	`,

	Title: styled.h2`
		font-size: 1.5rem;
		font-weight: bold;
		margin-bottom: 2rem;
		text-align: center;
	`,

	BusinesSection: styled.div`
		display: flex;
		gap: 2rem;
		margin-bottom: 2rem;
		flex-wrap: wrap;
		width: 100%;
		justify-content: space-between;
		border-radius: 8px;
		background-color: ${({ theme }) => theme.colors.primaryDark};
		padding: 1rem;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	`,

	Image: styled.img`
		width: 40%;
		border-radius: 8px;
		object-fit: cover;

		@media (max-width: 768px) {
		width: 100%;
		margin-bottom: 1rem;
		}
	`,

	Info: styled.div`
		width: 55%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		max-width: 100%; 
		overflow-wrap: break-word; 

		h1 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
		}

		p {
		margin: 0.2rem 0;
		font-size: 1rem;
		}

		p.description {
		word-wrap: break-word;
		word-break: break-word;
		white-space: pre-line; 
		overflow: hidden; 
		max-width: 100%;  
		}

		@media (max-width: 768px) {
		width: 100%;
		}
	`,

	LocationSection: styled.div`
		border-radius: 8px;
		background-color: ${({ theme }) => theme.colors.primary};
		padding: 1rem;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	`,

	LocationSectionContent: styled.div`
    display: flex;
    flex-direction: row; /* Itens lado a lado por padrão */
    gap: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    justify-content: space-between;
    align-items: center; /* Centraliza os itens dentro da LocationSection */

    @media (max-width: 768px) {
      flex-direction: column; /* Empurra para coluna em dispositivos menores */
      gap: 1rem;
    }
	`,

	InfoLocation: styled.div`
		width: 45%; /* Controla a largura da seção de informações */
		display: flex;
		flex-direction: column;
		align-items: flex-end;

		p {
		margin: 0.2rem 0;
		font-size: 1rem;
		}

		@media (max-width: 768px) {
		width: 100%;
		text-align: center;
		}
	`,

	Map: styled.iframe`
		width: 50%; /* Controla a largura do mapa */
		border: 0;
		margin-top: 1rem;
		border-radius: 8px;

		@media (max-width: 768px) {
		width: 100%;
		height: 200px; /* Ajusta a altura para telas pequenas */
		}
	`,

	HourbusinesSection: styled.div`
		margin-top: 2rem;
		border-radius: 8px;
		padding: 1rem;
		background-color: ${({ theme }) => theme.colors.primaryDark};
		box-shadow: 0 4px 8px rgba(0,0,0,0.1);
		overflow-x: auto;

		table {
			width: 100%;
			border-collapse: collapse;

			th, td {
				padding: 0.75rem;
				text-align: left;
				border-bottom: 1px solid #ccc;
			}

			th {
				background-color: ${({ theme }) => theme.colors.primary};
			}

			.highlight {
				background-color: ${({ theme }) => theme.colors.secondary};
				font-weight: bold;
			}

			.closed {
				color: red;
			}

			.open {
				color: green;
			}
		}
	`,

	ServicesSection: styled.section`
		margin-top: 2rem;

		h2 {
			font-size: 1.5rem;
			font-weight: bold;
			margin-bottom: 2rem;
			text-align: center;
		}

		input {
			width: 100%;
			padding: 0.75rem;
			border: 1px solid #ccc;
			border-radius: 8px;
			margin-bottom: 1.5rem;
			font-size: 1rem;
		}

		.cards {
			display: flex;
			flex-wrap: wrap;
			gap: 1.5rem;
		}

		.card {
			background: ${({ theme }) => theme.colors.primary};
			border-radius: 8px;
			box-shadow: 0 4px 6px rgba(0,0,0,0.1);
			padding: 1rem;
			width: calc(33.333% - 1rem);
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			img {
				width: 100%;
				border-radius: 8px;
				object-fit: cover;
				height: 150px;
			}

			.info {
				h3 {
					font-size: 1.2rem;
					margin-bottom: 0.3rem;
				}

				p {
					font-size: 0.95rem;
					margin: 0.2rem 0;
				}

				.desc {
					word-wrap: break-word;
					overflow: hidden;
					white-space: pre-line;
				}

				button {
					margin-top: auto;
					padding: 0.5rem 1rem;
					background-color: ${({ theme }) => theme.colors.primaryDark};
					border: none;
					border-radius: 6px;
					color: white;
					font-weight: bold;
					cursor: pointer;
				}
			}
		}

		@media (max-width: 1024px) {
			.card {
				width: calc(50% - 1rem);
			}
		}

		@media (max-width: 600px) {
			.card {
				width: 100%;
			}
		}
	`,

	PaymentSection: styled.section`
		margin-top: 2rem;
		background-color: ${({ theme }) => theme.colors.primaryDark};
		padding: 1rem;
		border-radius: 10px;
		box-shadow: 0 2px 6px rgba(0,0,0,0.1);

		h2 {
			font-size: 1.5rem;
			margin-bottom: 1.5rem;
		}

		.options {
			display: flex;
			flex-wrap: wrap;
			gap: 1.5rem;
			justify-content: center 
		}

		.card {
			background-color: ${({ theme }) => theme.colors.primary};
			padding: 1rem;
			border-radius: 10px;
			width: 160px;
			text-align: center;
			box-shadow: 0 2px 6px rgba(0,0,0,0.1);
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;

			img {
				width: 40px;
				height: 40px;
			}

			span {
				font-size: 1rem;
				font-weight: 500;
			}

			&:hover {
				transform: scale(1.02);
				box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
				cursor: pointer;
			}
		}

		@media (max-width: 600px) {
			.card {
				width: 100%;
			}
		}
	`,

	TeamSection: styled.section`
		padding: 2rem;
		text-align: center;

		h2 {
			font-size: 1.5rem;
			margin-bottom: 2rem;
		}
	`,

	TeamGrid: styled.div`
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 2rem;
	`,

	Card: styled.div`
		width: 250px;
		padding: 1rem;
		background-color: ${({ theme }) => theme.colors.primaryDark};
		border-radius: 8px;
		text-align: center;
		box-shadow: 0 4px 8px rgba(0,0,0,0.1);
		transition: all 0.3s ease;

		&:hover {
			transform: scale(1.03);
			box-shadow: 0 6px 12px rgba(0,0,0,0.15);
			cursor: pointer;
		}

		img {
			width: 100%;
			height: auto;
			border-radius: 50%;
			margin-bottom: 1rem;
		}

		h3 {
			font-size: 1.2rem;
			margin-bottom: 0.3rem;
		}

		h4 {
			font-size: 1rem;
			color: ${({ theme }) => theme.colors.secondary};
			margin-bottom: 0.5rem;
		}

		p {
			font-size: 0.9rem;
			color: #ccc;
		}
	`,

	ContactSection: styled.section`
		padding: 2rem;
		background-color: ${({ theme }) => theme.colors.primaryDark};
		border-radius: 8px;
		margin-top: 2rem;
		text-align: center;
	`,

	ContactRow: styled.div`
		display: flex;
		justify-content: center;
		gap: 2rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	`,

	ContactItem: styled.a`
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: inherit;
		text-decoration: none;
		color: #fff;

		&:hover {
			text-decoration: none;
			transform: scale(1.03);

			cursor: pointer;
		}
	`,

	ReviewsSection: styled.section`
    padding: 2rem;
  `,

  Stats: styled.div`
    text-align: center;
    margin-bottom: 2rem;
  `,

  Rating: styled.div`
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      color: #ffcc00;
      margin-right: 0.5rem;
    }
  `,

  Bookings: styled.div`
    font-size: 1rem;
    color: #666;
  `,

  ReviewCards: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,

  ReviewCard: styled.div`
    display: flex;
    padding: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `,

  UserDetails: styled.div`
    display: flex;
    gap: 1rem;
    width: 30%;
  `,

  UserImage: styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  `,

  UserInfo: styled.div`
    display: flex;
    flex-direction: column;
  `,

  UserName: styled.span`
    font-weight: bold;
  `,

  ReviewDate: styled.span`
    font-size: 0.9rem;
    color: #666;
  `,

  Service: styled.span`
    font-size: 0.9rem;
    color: #333;
  `,

  Comment: styled.p`
    margin-top: 1rem;
    font-size: 1rem;
    color: #333;
    width: 70%;
  `,

  RatingStars: styled.div`
    display: flex;
    gap: 0.2rem;
    margin-top: 0.5rem;
    color: #ffcc00;
  `,
};
