 
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ButtonCustom from '../../components/ButtomCustom';

export default function InitialSystem() {
    const [services, setServices] = useState([]);  
    const [userLocation, setUserLocation] = useState({ lat: -23.5505, lon: -46.6333 });
    const [nearbyServices, setNearbyServices] = useState([]);

    useEffect(() => {
        const simulatedData = [
            {
                id: 1,
                name: "Serviço A",
                category: "Categoria 1",
                rating: 4.5,
                bookings: 120,
                openingHours: "22:00",
                distance: 3.5,  
                address: "Rua ABC, 123",
                description: "Descrição do Serviço A",
                imageUrl: "https://via.placeholder.com/120",
                lat: -23.5505,
                lon: -46.6333 
            },
            {
                id: 2,
                name: "Serviço B",
                category: "Categoria 2",
                rating: 3.8,
                bookings: 250,
                openingHours: "18:00",
                distance: 2.2,
                address: "Avenida XYZ, 456",
                description: "Descrição do Serviço B",
                imageUrl: "https://via.placeholder.com/120",
                lat: -23.5500,
                lon: -46.6000
            },
            {
                id: 3,
                name: "Serviço C",
                category: "Categoria 3",
                rating: 4.7,
                bookings: 330,
                openingHours: "20:00",
                distance: 5.0,
                address: "Rua QWERTY, 789",
                description: "Descrição do Serviço C",
                imageUrl: "https://via.placeholder.com/120",
                lat: -23.5700,
                lon: -46.6200
            }
        ];
        setServices(simulatedData);
    }, []);
    
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; 
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    useEffect(() => {
        const storedLocation = JSON.parse(localStorage.getItem('userLocation'));
        if (storedLocation) setUserLocation(storedLocation);
    }, []);

    useEffect(() => {
        if (userLocation && services.length > 0) {
            const filteredServices = services.filter(service => {
                const distance = calculateDistance(userLocation.lat, userLocation.lon, service.lat, service.lon);
                return distance <= 10;  
            });
            setNearbyServices(filteredServices);
        }
    }, [userLocation, services]);

    const filterNearbyServices = (location) => {
        const filteredServices = services.filter(service => {
            const distance = calculateDistance(location.lat, location.lon, service.lat, service.lon);
            return distance <= 10;  
        });
        setNearbyServices(filteredServices);
    };

    return (
        <>
            <Body>
                <Title>Serviços Recomendados</Title>
                <CardList>
                    {services.length === 0 ? (
                        <Card><CardDescription>Não há serviços disponíveis no momento.</CardDescription></Card>
                    ) : (
                        services.map((service) => (
                            <Card key={service.id}>
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
                        ))
                    )}
                </CardList>
                <ButtonCustom padding="0.75rem 2rem">Veja Mais!</ButtonCustom>

                <hr />

                <Title>Perto de Você!</Title>
                <CardList>
                    {nearbyServices.length === 0 ? (
                        <Card><CardDescription>Não há serviços próximos disponíveis no momento.</CardDescription></Card>
                    ) : (
                        nearbyServices.map((service) => (
                            <Card key={service.id}>
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
                        ))
                    )}
                </CardList>
            </Body>
        </>
    );
}

const Header = styled.header`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: #f4f4f4;
`;

const TopSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const LeftLinks = styled.div`
    display: flex;
    gap: 10px;
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

const BottomSection = styled.div`
    display: flex;
    padding-top: 1rem;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const ImageWrapper = styled.div`
    width: 10%;
    img {
        width: 100%;
        height: auto;
    }

    @media (max-width: 768px) {
        width: 60%;
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