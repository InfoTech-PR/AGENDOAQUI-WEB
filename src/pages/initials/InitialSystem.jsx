import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainLayout from "../../layouts/MainLayout";
import ButtonCustom from '../../components/ButtonCustom';
import { useNavigate } from 'react-router-dom';

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const toRad = (x) => (x * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; 
  return distance * 1000; 
};
  
export default function InitialSystem() {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nearbyServices, setNearbyServices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentService = services[currentIndex] || {};
  const navigate = useNavigate();

  const handleCardClick = (service) => {
  navigate('/business', { state: { service } });
  };
  
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

  useEffect(() => {
    const simulatedData = [
        {
            id: 1,
            name: "Serviço A",
            category: "Categoria 1",
            rating: 4.5,
            bookings: 120,
            openingHours: "22:00",
            distance: 0,  
            address: "Rua ABC, 123",
            description: "Descrição do Serviço A",
            imageUrl: "https://www.pngkey.com/png/detail/14-148130_minion-imagenes-de-100x100-pixeles.png",
            lat: -25.520297,
            lon: -48.5287365 
        },
        {
            id: 2,
            name: "Serviço B",
            category: "Categoria 2",
            rating: 3.8,
            bookings: 250,
            openingHours: "18:00",
            distance: 0,
            address: "Avenida XYZ, 456",
            description: "Descrição do Serviço B",
            imageUrl: "https://www.pngkey.com/png/detail/14-148130_minion-imagenes-de-100x100-pixeles.png",
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
            distance: 0,
            address: "Rua QWERTY, 789",
            description: "Descrição do Serviço C",
            imageUrl: "https://www.pngkey.com/png/detail/14-148130_minion-imagenes-de-100x100-pixeles.png",
            lat: -23.5700,
            lon: -46.6200
        }
    ];
    const sortedData = simulatedData.sort((a, b) => {
      if (b.rating === a.rating) {
          return b.bookings - a.bookings;
      }
      return b.rating - a.rating; 
    });
    setServices(sortedData);
  }, []);

  useEffect(() => {
    if (userLocation) {
      const updatedServices = services.map((service) => {
        if (userLocation === "error" || !userLocation) {
          return { ...service, distance: null };
        }

        const distance = haversineDistance(userLocation.lat, userLocation.lon, service.lat, service.lon);
        return { ...service, distance: (distance / 1000).toFixed(2) };
      });

      const nearby = updatedServices.filter((service) => service.distance !== null && service.distance <= 1);
      setNearbyServices(nearby);
      setServices(updatedServices);
    } else {
      setNearbyServices([]); 
    }
  }, [userLocation]);
    
  const nextService = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const prevService = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
  };

  return (
    <MainLayout>
      <Styled.Body>
        {user && (
          <>
            <Styled.Title>Agendar Novamente</Styled.Title>
            <Styled.Carousel>
              <Styled.ArrowButton left onClick={prevService}>{"<"}</Styled.ArrowButton>

              <Styled.Card key={service.id} onClick={() => handleCardClick(service)} style={{ cursor: 'pointer' }}>
                <Styled.CardImage src={currentService.imageUrl} alt={currentService.name} />
                <Styled.CardContent>
                  <Styled.CardHeader>
                    <div>
                      <Styled.CardName>
                        {currentService.name} <Styled.CardCategory>{currentService.category}</Styled.CardCategory>
                      </Styled.CardName>
                      <Styled.CardRating>⭐ {currentService.rating}</Styled.CardRating>
                      <Styled.CardBookings>{currentService.bookings} agendamentos concluídos</Styled.CardBookings>
                    </div>
                    <Styled.CardDetails>
                      <Styled.CardOpenUntil>Aberto até {currentService.openingHours}</Styled.CardOpenUntil>
                      <Styled.CardDistance>
                        {currentService.distance !== null ? `${currentService.distance} km de você` : "Distância indisponível"}
                      </Styled.CardDistance>
                      <Styled.CardLocation>{currentService.address}</Styled.CardLocation>
                    </Styled.CardDetails>
                  </Styled.CardHeader>
                  <Styled.CardDescription>{currentService.description}</Styled.CardDescription>
                </Styled.CardContent>
              </Styled.Card>

              <Styled.ArrowButton right onClick={nextService}>{">"}</Styled.ArrowButton>
            </Styled.Carousel>
            </>
        )}

        <Styled.Title>Serviços Recomendados</Styled.Title>

        <Styled.CardList>
          {services.length === 0 ? (
            <Styled.Card key={services.id} onClick={() => handleCardClick(services)} style={{ cursor: 'pointer' }}>
              <Styled.CardDescription>Não há serviços disponíveis no momento.</Styled.CardDescription>
            </Styled.Card>
          ) : (
            services.map((service) => (
              <Styled.Card key={service.id} onClick={() => handleCardClick(service)} style={{ cursor: 'pointer' }}>
                <Styled.CardImage src={service.imageUrl} alt={service.name} />
                <Styled.CardContent>
                  <Styled.CardHeader>
                    <div>
                      <Styled.CardName>
                        {service.name} <Styled.CardCategory>{service.category}</Styled.CardCategory>
                      </Styled.CardName>
                      <Styled.CardRating>⭐ {service.rating}</Styled.CardRating>
                      <Styled.CardBookings>{service.bookings} agendamentos concluídos</Styled.CardBookings>
                    </div>
                    <Styled.CardDetails>
                      <Styled.CardOpenUntil>Aberto até {service.openingHours}</Styled.CardOpenUntil>
                      <Styled.CardDistance>
                        {service.distance !== null ? `${service.distance} km de você` : "Distância indisponível"}
                      </Styled.CardDistance>
                      <Styled.CardLocation>{service.address}</Styled.CardLocation>
                    </Styled.CardDetails>
                  </Styled.CardHeader>
                  <Styled.CardDescription>{service.description}</Styled.CardDescription>
                </Styled.CardContent>
              </Styled.Card>
            ))
          )}
        </Styled.CardList>

        <ButtonCustom>Veja Mais!</ButtonCustom>

        <hr />

        <Styled.Title>Perto de Você!</Styled.Title>
        <Styled.CardList>
          {nearbyServices.length === 0 ? (
            <Styled.Card key={nearbyServices.id} onClick={() => handleCardClick(service)} style={{ cursor: 'pointer' }}>
              <Styled.CardDescription>Não há serviços próximos disponíveis no momento.</Styled.CardDescription>
            </Styled.Card>
          ) : (
            nearbyServices.map((service) => (
              <Styled.Card key={service.id} onClick={() => handleCardClick(service)} style={{ cursor: 'pointer' }}>
                <Styled.CardImage src={service.imageUrl} alt={service.name} />
                <Styled.CardContent>
                  <Styled.CardHeader>
                    <div>
                      <Styled.CardName>
                        {service.name} <Styled.CardCategory>{service.category}</Styled.CardCategory>
                      </Styled.CardName>
                      <Styled.CardRating>⭐ {service.rating}</Styled.CardRating>
                      <Styled.CardBookings>{service.bookings} agendamentos concluídos</Styled.CardBookings>
                    </div>
                    <Styled.CardDetails>
                      <Styled.CardOpenUntil>Aberto até {service.openingHours}</Styled.CardOpenUntil>
                      <Styled.CardDistance>{service.distance} km de você</Styled.CardDistance>
                      <Styled.CardLocation>{service.address}</Styled.CardLocation>
                    </Styled.CardDetails>
                  </Styled.CardHeader>
                  <Styled.CardDescription>{service.description}</Styled.CardDescription>
                </Styled.CardContent>
              </Styled.Card>
            ))
          )}
        </Styled.CardList>
      </Styled.Body>
    </MainLayout>
  );
}

const Styled = {
  Carousel: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: nowrap;
    overflow-x: auto;
  `,

  ArrowButton: styled.button`
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #333;

    ${({ left }) => left && `
      margin-right: 1rem;
    `}

    ${({ right }) => right && `
      margin-left: 1rem;
    `}
  `,

  Header: styled.header`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: rgb(204, 204, 204);
  `,

  Body: styled.main`
    padding: 2rem;
  `,

  Title: styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  `,

  CardList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 1rem;
  `,

  Card: styled.div`
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
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.02);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  `,

  CardImage: styled.img`
    width: 120px;
    height: 120px;
    border-radius: 8px;
    object-fit: cover;
    margin-right: 1rem;
  `,

  CardContent: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,

  CardHeader: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  `,

  CardName: styled.h3`
    font-size: 1.2rem;
    font-weight: bold;
  `,

  CardCategory: styled.p`
    font-size: 0.9rem;
    color: #777;
  `,

  CardRating: styled.p`
    font-size: 1rem;
    font-weight: bold;
    color: #ffb400;
  `,

  CardBookings: styled.p`
    font-size: 0.9rem;
    color: #333;
  `,

  CardDetails: styled.div`
    text-align: right;
  `,

  CardOpenUntil: styled.p`
    font-size: 0.9rem;
    color: #333;
  `,

  CardDistance: styled.p`
    font-size: 0.9rem;
    color: #333;
  `,

  CardLocation: styled.p`
    font-size: 0.9rem;
    color: #777;
  `,

  CardDescription: styled.p`
    font-size: 1rem;
    color: #555;
    margin-bottom: 1rem;
  `,
};