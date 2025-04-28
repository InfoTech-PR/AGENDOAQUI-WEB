import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function InitialSystem() {
    const [services, setServices] = useState([]);  

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('/api/services'); 
                const data = await response.json();
                
                if (data.length === 0) {
                    setServices(simulatedData());
                } else {
                    setServices(data);
                }
            } catch (error) {
                console.log(error);
                setServices(simulatedData());
            }
        };

        fetchServices();
    }, []);

    const simulatedData = () => [
        {
            name: 'Negócio A',
            category: 'Categoria A',
            rating: 4.5,
            bookings: 50,
            openingHours: '18:00',
            distance: 1.5,
            address: 'Rua X, 123',
            description: 'Descrição do serviço A.',
            imageUrl: 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='
        },
        {
            name: 'Negócio B',
            category: 'Categoria B',
            rating: 4.2,
            bookings: 40,
            openingHours: '19:00',
            distance: 2.0,
            address: 'Rua Y, 456',
            description: 'Descrição do serviço B.',
            imageUrl: 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='
        },
        {
            name: 'Negócio C',
            category: 'Categoria C',
            rating: 3.8,
            bookings: 30,
            openingHours: '17:00',
            distance: 3.0,
            address: 'Rua Z, 789',
            description: 'Descrição do serviço C.',
            imageUrl: 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='
        }
    ];

    return (
        <>
            <Header>
                <TopSection>
                    <LeftLinks>
                        <Link href="/central">Central do Negócio</Link> | 
                        <Link href="/promote">Promova seu Negócio Também</Link>
                    </LeftLinks>
                    <RightButtons>
                        <Button>Cadastrar</Button>
                        <Button>Entrar</Button>
                    </RightButtons>
                </TopSection>
                <BottomSection>
                    <ImageWrapper>
                        <img src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=" alt="Imagem do Negócio" />
                    </ImageWrapper>
                    <SearchWrapper>
                        <SearchInput placeholder="Digite o Nome do Negócio ou a Categoria" />
                    </SearchWrapper>
                </BottomSection>
            </Header>

            <Body>
                <Title>Serviços Recomendados</Title>
                <CardList>
                    {/* Renderizando os cards dinamicamente com os dados da API */}
                    {services.map((service, index) => (
                        <Card key={index}>
                            <CardImage src={service.imageUrl} alt={service.name} />
                            <CardContent>
                                <CardHeader>
                                    <div>
                                        <CardName>{service.name} <CardCategory>{service.category}</CardCategory></CardName>
                                        <CardRating>⭐ {service.rating}</CardRating>
                                        <CardBookings>{service.bookings} agendamentos concluídos</CardBookings>
                                    </div>
                                    <CardDetails>
                                        <CardOpenUntil>Aberto até {service.openingHours}</CardOpenUntil>
                                        <CardDistance>{service.distance} km de você</CardDistance>
                                        <CardLocation>{service.address}</CardLocation>
                                    </CardDetails>
                                </CardHeader>
                                <CardDescription>{service.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </CardList>
                <SeeMoreButton>Veja Mais</SeeMoreButton>
            </Body>
        </>
    );
}

const Header = styled.header`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: #f4f4f4;

    @media (max-width: 768px) {
        padding: 0.5rem;
    }
`;

const TopSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const LeftLinks = styled.div`
    display: flex;
    gap: 10px;

    @media (max-width: 768px) {
        margin-bottom: 10px;
    }
`;

const Link = styled.a`
    text-decoration: none;
    color: #007bff;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`;

const RightButtons = styled.div`
    display: flex;
    gap: 10px;

    @media (max-width: 768px) {
        width: 100%;
        justify-content: space-between;
    }
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background-color: #0056b3;
    }
`;

const BottomSection = styled.div`
    display: flex;
    padding-top: 1rem;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const ImageWrapper = styled.div`
    width: 10%;  /* Ajuste da largura para telas grandes */
    img {
        width: 100%;
        height: auto;
    }

    @media (max-width: 768px) {
        width: 60%;  /* Ajuste da largura para telas pequenas */
        margin-bottom: 10px;
    }
`;

const SearchWrapper = styled.div`
    width: 70%;
    padding-left: 80px;

    @media (max-width: 768px) {
        width: 90%;
        padding-left: 0;
    }
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    color: #333;

    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;

const Body = styled.main`
    padding: 2rem;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
`;

const CardList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const Card = styled.div`
    display: flex;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    align-items: center;

    @media (min-width: 769px) {
        flex-direction: row;
        align-items: flex-start;
    }
`;

const CardImage = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 8px;
    object-fit: cover;
    margin-right: 1rem;
`;

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

const CardName = styled.h3`
    font-size: 1.2rem;
    font-weight: bold;
`;

const CardCategory = styled.p`
    font-size: 0.9rem;
    color: #777;
`;

const CardRating = styled.p`
    font-size: 1rem;
    font-weight: bold;
    color: #ffb400;
`;

const CardBookings = styled.p`
    font-size: 0.9rem;
    color: #333;
`;

const CardDetails = styled.div`
    text-align: right;
`;

const CardOpenUntil = styled.p`
    font-size: 0.9rem;
    color: #333;
`;

const CardDistance = styled.p`
    font-size: 0.9rem;
    color: #333;
`;

const CardDescription = styled.p`
    font-size: 1rem;
    color: #555;
    margin-bottom: 1rem;
`;

const CardLocation = styled.p`
    font-size: 0.9rem;
    color: #777;
`;

const SeeMoreButton = styled.button`
    background-color: #007bff;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    bottom: 1rem;
    right: 1rem;
    width: auto;
    text-align: center;
    margin: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;
