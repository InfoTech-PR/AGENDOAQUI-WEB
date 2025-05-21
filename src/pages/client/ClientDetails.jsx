import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from "../../layouts/MainLayout";
import { getClientById } from '../../services/clients';
import { CustomButton, CustomInput, CustomDateInput, PhoneInput } from '../../components';

export default function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchClient() {
      setLoading(true);
      try {
        const data = await getClientById(id);
        console.log(data)
        setClient(data);
      } catch (err) {
        setError("Erro ao carregar detalhes do cliente.");
      } finally {
        setLoading(false);
      }
    }

    fetchClient();
  }, [id]);

  if (loading) return <MainLayout><p>Carregando...</p></MainLayout>;
  if (error) return <MainLayout><p style={{ color: 'red' }}>{error}</p></MainLayout>;
  if (!client) return null;

  return (
    <MainLayout>
      <Styled.Container>
        <Styled.Header>
          <Styled.Title>Cliente - Detalhamento</Styled.Title>
        </Styled.Header>

        <Styled.InfoGroup>
          <Styled.Field>
            <CustomInput
              label="Nome do Cliente"
              name="name"
              value={client.name}
              disabled={!isEditing}
              onChange={(e) => setClient({ ...client, name: e.target.value })}
              required
            />
          </Styled.Field>

          <Styled.Field>
            <CustomDateInput
              label="Data de Nascimento"
              name="dob"
              value={client.dob ? client.dob.split('T')[0] : ''}
              disabled={!isEditing}
              onChange={(e) => setClient({ ...client, dob: e.target.value })}
            />
          </Styled.Field>

          <Styled.Field>
            <PhoneInput
              label="Telefone"
              name="phone"
              value={client.phone || 'Não informado'}
              disabled={!isEditing}
              onChange={(e) => setClient({ ...client, phone: e.target.value })}
            />
          </Styled.Field>

          <Styled.Field>
            <CustomInput
              label="Email"
              name="email"
              value={client.email || 'Não informado'}
              disabled={!isEditing}
              onChange={(e) => setClient({ ...client, email: e.target.value })}
              required
            />
          </Styled.Field>

          <Styled.StatusAndInfo>
            <Styled.StatusField>
              <Styled.StatusOption selected={client.active}>
                <Styled.StatusDot color="green" />
                Ativo
              </Styled.StatusOption>
              <Styled.StatusOption selected={!client.active}>
                <Styled.StatusDot color="red" />
                Inativo
              </Styled.StatusOption>
            </Styled.StatusField>

            <Styled.InfoSide>
              <Styled.Value>
                Criado por {client.createdBy || 'usuário desconhecido'} em {new Date(client.createdAt).toLocaleDateString()}.
                {client.updatedAt && (
                  <> Atualizado em {new Date(client.updatedAt).toLocaleDateString()}.</>
                )}
              </Styled.Value>
            </Styled.InfoSide>
          </Styled.StatusAndInfo>
        </Styled.InfoGroup>

        {!isEditing ? (
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <CustomButton variant="primary" onClick={() => setIsEditing(true)}>
              Editar
            </CustomButton>
            <CustomButton variant="success" onClick={() => navigate(`/agendamento?clienteId=${client.id}`)}>
              Marcar Agendamento para esse Cliente
            </CustomButton>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <CustomButton variant="error" onClick={() => setIsEditing(false)}>
              Cancelar
            </CustomButton>
            <CustomButton variant="success" onClick={() => {/* lógica para confirmar edição */}}>
              Confirmar
            </CustomButton>
          </div>
        )}
      </Styled.Container>
    </MainLayout>
  );
}

const Styled = {
  Container: styled.div`
    padding: 2rem;
    font-family: sans-serif;
    max-width: 800px;
    margin: auto;
  `,

  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;

    h2 {
      margin: 0;
    }
  `,

  Value: styled.div`
    background-color: #f5f5f5;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    border: 1px solid #ddd;
    line-height: 1.4;
  `,

  Title: styled.h2`
    text-align: left;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text};
  `,

  Actions: styled.div`
    display: flex;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      width: 100%;

      button {
        width: 100%;
      }
    }
  `,

  InfoGroup: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  `,

  Field: styled.div`
    flex: 1 1 calc(50% - 0.75rem); 

    @media (max-width: 768px) {
      flex: 1 1 100%; 
    }
  `,
  
  Label: styled.span`
    font-weight: bold;
    color: #555;
  `,

  StatusAndInfo: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    margin-top: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  `,

  StatusField: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,

  StatusOption: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: ${({ selected }) => (selected ? '#e0e0e0' : 'transparent')};
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  `,

  StatusDot: styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ color }) => color || '#ccc'};
  `,

  InfoSide: styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;

    @media (max-width: 768px) {
      justify-content: flex-start;
    }
  `,

  InfoLine: styled.div`
    display: flex;
    flex-direction: column;
  `,
};
