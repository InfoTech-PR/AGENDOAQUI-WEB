import styled from "styled-components";
import { CustomButton } from "..";

export default function ServiceList({ services }) {
  const baseUrl = import.meta.env.VITE_BASE_URL || '';

  return (
    <Styled.CardGrid>
      {services.map(({ id, image, name, summary, price }) => (
        <Styled.Card key={id}>
          <Styled.ImageWrapper>
            {image ? (
              <Styled.ServiceImage src={image ? `${baseUrl}${image}` : ''} alt={name} />
            ) : (
              <Styled.Placeholder>Sem imagem</Styled.Placeholder>
            )}
          </Styled.ImageWrapper>

          <Styled.ServiceInfo>
            <Styled.ServiceName>{name}</Styled.ServiceName>
            <Styled.ServiceSummary>{summary}</Styled.ServiceSummary>
            <Styled.ServicePrice>
              Preço: R$ {typeof price === "number" ? price.toFixed(2) : price}
            </Styled.ServicePrice>
          </Styled.ServiceInfo>
            <Styled.ButtonGroup>
              <CustomButton >Editar</CustomButton>
              <CustomButton variant="error">Excluir</CustomButton>
            </Styled.ButtonGroup>
        </Styled.Card>
      ))}
    </Styled.CardGrid>
  );
}

const Styled = {
  CardGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  `,

  Card: styled.div`
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }
  `,

  ButtonGroup: styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    justify-content: center;
    align-items: center; 
  `,

  ImageWrapper: styled.div`
    width: 100%;
    height: 180px;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  ServiceImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,

  Placeholder: styled.div`
    color: #999999;
    font-size: 1rem;
  `,

  ServiceInfo: styled.div`
    padding: 1rem 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `,

  ServiceName: styled.h3`
    font-weight: 700;
    font-size: 1.25rem;
    color: #222222;
    margin: 0 0 0.5rem 0;
  `,

  ServiceSummary: styled.p`
    flex-grow: 1;
    font-size: 1rem;
    color: #555555;
    margin-bottom: 1rem;
    line-height: 1.4;
  `,

  ServicePrice: styled.p`
    font-weight: 700;
    font-size: 1.1rem;
    color: #007BFF;
    margin: 0;
  `,
};
