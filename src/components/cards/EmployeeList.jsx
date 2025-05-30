import styled from "styled-components";
import { CustomButton } from "..";

export default function EmployeeList({ employees }) {
  const baseUrl = import.meta.env.VITE_BASE_URL || '';

  return (
    <Styled.CardGrid>
      {employees.map(({ id, image, name, specialization, summary }) => (
        <Styled.Card key={id}>
          <Styled.ImageWrapper>
            {image ? (
              <Styled.EmployeeImage src={image ? `${baseUrl}${image}` : ''} alt={name} />
            ) : (
              <Styled.Placeholder>Sem imagem</Styled.Placeholder>
            )}
          </Styled.ImageWrapper>

          <Styled.EmployeeInfo>
            <Styled.EmployeeName>{name}</Styled.EmployeeName>
            <Styled.EmployeeSummary>{summary}</Styled.EmployeeSummary>
            <Styled.EmployeeSummary>{specialization}</Styled.EmployeeSummary>
          </Styled.EmployeeInfo>

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

  ButtonGroup: styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    justify-content: center;
    align-items: center; 
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

  ImageWrapper: styled.div`
    width: 100%;
    height: 180px;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  `,

  EmployeeImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  `,

  Placeholder: styled.div`
    color: #999999;
    font-size: 1rem;
  `,

  EmployeeInfo: styled.div`
    padding: 1rem 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `,

  EmployeeName: styled.h3`
    font-weight: 700;
    font-size: 1.25rem;
    color: #222222;
    margin: 0 0 0.5rem 0;
  `,

  EmployeeSummary: styled.p`
    flex-grow: 1;
    font-size: 1rem;
    color: #555555;
    margin-bottom: 1rem;
    line-height: 1.4;
  `,
};
