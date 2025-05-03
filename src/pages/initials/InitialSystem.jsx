import React, { useEffect, useState } from 'react';

export default function InitialSystem() {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          };
          setUserLocation(coords);
          setLoading(false); // Atualiza para indicar que a localização foi carregada
          console.log("Localização do usuário:", coords);
        },
        (error) => {
          setUserLocation("error");
          setLoading(false); // Atualiza para indicar que a localização foi carregada com erro
          console.error("Erro ao obter localização:", error.message);
        }
      );
    } else {
      console.warn("Geolocalização não suportada pelo navegador.");
      setLoading(false); // Atualiza quando geolocalização não é suportada
    }
  }, []);

  if (loading) {
    return <div>Carregando localização...</div>; // Exibe mensagem de carregamento
  }

  // Exibe a localização ou mensagem de erro
  return (
    <>
      {userLocation === "error" ? (
        <div>Não foi possível obter a sua localização.</div>
      ) : (
        <div>Localização: Latitude {userLocation.lat}, Longitude {userLocation.lon}</div>
      )}
    </>
  );
}

// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import ButtonCustom from '../../components/ButtomCustom';

// export default function InitialSystem() {
//     const [services, setServices] = useState([]);
//     const [userLocation, setUserLocation] = useState(null);

//     useEffect(() => {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(
//                     (position) => {
//                         const coords = {
//                             lat: position.coords.latitude,
//                             lon: position.coords.longitude
//                         };
//                         setUserLocation(coords);
//                         console.log("Localização do usuário:", coords);
//                     },
//                     (error) => {
//                         setUserLocation("error");
//                         console.error("Erro ao obter localização:", error.message);
//                     }
//                 );
//             } else {
//                 console.warn("Geolocalização não suportada pelo navegador.");
//             }
//     }, []);
    
//     useEffect(() => {
//         const simulatedData = [
//             {
//                 id: 1,
//                 name: "Serviço A",
//                 category: "Categoria 1",
//                 rating: 4.5,
//                 bookings: 120,
//                 openingHours: "22:00",
//                 distance: 3.5,  
//                 address: "Rua ABC, 123",
//                 description: "Descrição do Serviço A",
//                 imageUrl: "https://www.pngkey.com/png/detail/14-148130_minion-imagenes-de-100x100-pixeles.png",
//                 lat: -23.5505,
//                 lon: -46.6333 
//             },
//             {
//                 id: 2,
//                 name: "Serviço B",
//                 category: "Categoria 2",
//                 rating: 3.8,
//                 bookings: 250,
//                 openingHours: "18:00",
//                 distance: 2.2,
//                 address: "Avenida XYZ, 456",
//                 description: "Descrição do Serviço B",
//                 imageUrl: "https://www.pngkey.com/png/detail/14-148130_minion-imagenes-de-100x100-pixeles.png",
//                 lat: -23.5500,
//                 lon: -46.6000
//             },
//             {
//                 id: 3,
//                 name: "Serviço C",
//                 category: "Categoria 3",
//                 rating: 4.7,
//                 bookings: 330,
//                 openingHours: "20:00",
//                 distance: 5.0,
//                 address: "Rua QWERTY, 789",
//                 description: "Descrição do Serviço C",
//                 imageUrl: "https://www.pngkey.com/png/detail/14-148130_minion-imagenes-de-100x100-pixeles.png",
//                 lat: -23.5700,
//                 lon: -46.6200
//             }
//         ];
//         setServices(simulatedData);
//     }, []);

//     return (
//         <>
//             <Styled.Header>
//                 <Styled.TopSection>
//                     <Styled.LeftLinks>
//                         <Styled.Link href="/central">Central do Negócio</Styled.Link> | 
//                         <Styled.Link href="/promote">Promova seu Negócio Também</Styled.Link>
//                     </Styled.LeftLinks>
//                     <Styled.RightButtons>
//                         <ButtonCustom>Cadastrar</ButtonCustom>
//                         <ButtonCustom>Entrar</ButtonCustom>
//                     </Styled.RightButtons>
//                 </Styled.TopSection>
//                 <Styled.BottomSection>
//                     <Styled.ImageWrapper>
//                         <img
//                         src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
//                         alt="Imagem do Negócio"
//                         />
//                     </Styled.ImageWrapper>
//                     <Styled.SearchWrapper>
//                         <Styled.SearchInput placeholder="Digite o Nome do Negócio ou a Categoria" />
//                     </Styled.SearchWrapper>
//                 </Styled.BottomSection>
//             </Styled.Header>

//             {userLocation}

//             <Styled.Body>
//                 <Styled.Title>Serviços Recomendados</Styled.Title>
//                 <Styled.CardList>
//                 {services.length === 0 ? (
//                     <Styled.Card>
//                         <Styled.CardDescription>Não há serviços disponíveis no momento.</Styled.CardDescription>
//                     </Styled.Card>
//                 ) : (
//                     services.map((service) => (
//                     <Styled.Card key={service.id}>
//                         <Styled.CardImage src={service.imageUrl} alt={service.name} />
//                         <Styled.CardContent>
//                             <Styled.CardHeader>
//                                 <div>
//                                     <Styled.CardName>
//                                         {service.name} <Styled.CardCategory>{service.category}</Styled.CardCategory>
//                                     </Styled.CardName>
//                                     <Styled.CardRating>⭐ {service.rating}</Styled.CardRating>
//                                     <Styled.CardBookings>{service.bookings} agendamentos concluídos</Styled.CardBookings>
//                                 </div>
//                                 <Styled.CardDetails>
//                                 <Styled.CardOpenUntil>Aberto até {service.openingHours}</Styled.CardOpenUntil>
//                                 <Styled.CardDistance>{service.distance} km de você</Styled.CardDistance>
//                                 <Styled.CardLocation>{service.address}</Styled.CardLocation>
//                                 </Styled.CardDetails>
//                             </Styled.CardHeader>
//                             <Styled.CardDescription>{service.description}</Styled.CardDescription>
//                         </Styled.CardContent>
//                     </Styled.Card>
//                     ))
//                 )}
//                 </Styled.CardList>

//                 <ButtonCustom>Veja Mais!</ButtonCustom>

//                 <hr />

//                 <Styled.Title>Perto de Você!</Styled.Title>
//                 <Styled.CardList>
//                     <Styled.Card>
//                         <Styled.CardDescription>Não há serviços próximos disponíveis no momento.</Styled.CardDescription>
//                     </Styled.Card>
//                 </Styled.CardList>
//             </Styled.Body>
//         </>
//     );
// }

// const Styled = {
//   Header: styled.header`
//     display: flex;
//     flex-direction: column;
//     padding: 1rem;
//     background-color: rgb(204, 204, 204);
//   `,

//   TopSection: styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding-bottom: 1rem;

//     @media (max-width: 768px) {
//       flex-direction: column;
//     }
//   `,

//   LeftLinks: styled.div`
//     display: flex;
//     gap: 10px;
//   `,

//   Link: styled.a`
//     text-decoration: none;
//     color: #007bff;
//     font-weight: bold;

//     &:hover {
//       text-decoration: underline;
//     }
//   `,

//   RightButtons: styled.div`
//     display: flex;
//     gap: 10px;

//     @media (max-width: 768px) {
//       width: 100%;
//       justify-content: space-between;
//     }
//   `,

//   BottomSection: styled.div`
//     display: flex;
//     padding-top: 1rem;
//     align-items: center;
//     flex-wrap: wrap;

//     @media (max-width: 768px) {
//       flex-direction: column;
//       align-items: center;
//     }
//   `,

//   ImageWrapper: styled.div`
//     width: 10%;

//     img {
//       width: 100%;
//       height: auto;
//     }

//     @media (max-width: 768px) {
//       width: 60%;
//       margin-bottom: 10px;
//     }
//   `,

//   SearchWrapper: styled.div`
//     width: 70%;
//     padding-left: 80px;

//     @media (max-width: 768px) {
//       width: 90%;
//       padding-left: 0;
//     }
//   `,

//   SearchInput: styled.input`
//     width: 100%;
//     padding: 0.75rem;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//     font-size: 1rem;
//     color: #333;

//     &:focus {
//       outline: none;
//       border-color: #007bff;
//     }
//   `,

//   Body: styled.main`
//     padding: 2rem;
//   `,

//   Title: styled.h2`
//     font-size: 1.5rem;
//     font-weight: bold;
//     margin-bottom: 1.5rem;
//   `,

//   CardList: styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 1.5rem;
//     margin-bottom: 1rem;
//   `,

//   Card: styled.div`
//     display: flex;
//     background-color: #fff;
//     border: 1px solid #ddd;
//     border-radius: 8px;
//     padding: 1rem;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//     flex-direction: column;
//     align-items: center;

//     @media (min-width: 769px) {
//       flex-direction: row;
//       align-items: flex-start;
//     }
//   `,

//   CardImage: styled.img`
//     width: 120px;
//     height: 120px;
//     border-radius: 8px;
//     object-fit: cover;
//     margin-right: 1rem;
//   `,

//   CardContent: styled.div`
//     display: flex;
//     flex-direction: column;
//     flex: 1;
//   `,

//   CardHeader: styled.div`
//     display: flex;
//     justify-content: space-between;
//     margin-bottom: 1rem;
//   `,

//   CardName: styled.h3`
//     font-size: 1.2rem;
//     font-weight: bold;
//   `,

//   CardCategory: styled.p`
//     font-size: 0.9rem;
//     color: #777;
//   `,

//   CardRating: styled.p`
//     font-size: 1rem;
//     font-weight: bold;
//     color: #ffb400;
//   `,

//   CardBookings: styled.p`
//     font-size: 0.9rem;
//     color: #333;
//   `,

//   CardDetails: styled.div`
//     text-align: right;
//   `,

//   CardOpenUntil: styled.p`
//     font-size: 0.9rem;
//     color: #333;
//   `,

//   CardDistance: styled.p`
//     font-size: 0.9rem;
//     color: #333;
//   `,

//   CardLocation: styled.p`
//     font-size: 0.9rem;
//     color: #777;
//   `,

//   CardDescription: styled.p`
//     font-size: 1rem;
//     color: #555;
//     margin-bottom: 1rem;
//   `,
// };