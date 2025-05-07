import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainLayout from "../../layouts/MainLayout";
import ButtonCustom from '../../components/ButtonCustom';
import { useLocation } from 'react-router-dom';

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
  
export default function InitialBusiness() {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
const [nearbyServices, setNearbyServices] = useState([]);
const { state } = useLocation();
    const service = state?.service;
    if (!service) return <p>Serviço não encontrado.</p>;

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

  return (
    <MainLayout>
          <Styled.Body>
              <Styled.Title>Tela de Negócios</Styled.Title>
                  <div>
      <h1>{service.name}</h1>
      <p>{service.description}</p>
      {/* renderize outros dados conforme necessário */}
    </div>
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
    margin-bottom: 1.5rem;
  `,
};