import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from "../../layouts/MainLayout";
import { getClientById, updateClient } from '../../services/clients';
import { CustomButton, CustomInput, CustomDateInput, PhoneInput, CustomModal } from '../../components';

export default function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [originalClient, setOriginalClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [reload, setReload] = useState(false);
  const [modal, setModal] = useState({ show: false, type: "info", message: "", onConfirm: null });
  const [isConfirming, setIsConfirming] = useState(false);
  const sanitizePhone = (phone) => phone.replace(/\D/g, '');

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isEditing) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isEditing]);
  
  useEffect(() => {
    async function fetchClient() {
      setLoading(true);
      try {
        const data = await getClientById(id);
        setClient(data);
        setOriginalClient(data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }

    fetchClient();
  }, [id, reload]);

  function cancelEdition() {
    setIsEditing(false);
    setClient(originalClient);
  }

  function handleConfirm() {
    const requiredFields = ['name', 'email', 'dob', 'phone'];
    const emptyRequiredFields = requiredFields.filter(field => !client[field]);

    if (emptyRequiredFields.length > 0) {
      setModal({
        show: true,
        type: "warning",
        message: "Um campo obrigatório foi deixado em branco! O sistema irá manter o dado cadastrado anteriormente para esse campo e salvar as demais alterações. Deseja manter ou continuar editando?",
        onConfirm: handleKeepPrevious,
        onCancel: () => setModal({ ...modal, show: false })
      });
      return;
    }

    performSave();
  }

  function handleKeepPrevious() {
    const updatedClient = { ...client };
  
    if (!client.name) updatedClient.name = originalClient.name;
    if (!client.email) updatedClient.email = originalClient.email;
    if (!client.dob) updatedClient.dob = originalClient.dob;
    if (!client.phone) updatedClient.phone = originalClient.phone;
  
    setClient(updatedClient);
    setModal({ ...modal, show: false });
  
    performSave(updatedClient);
  }

  async function performSave(clientData = client) {
    setIsConfirming(true);

    const sanitizedData = {
        ...clientData,
      phone: sanitizePhone(clientData.phone),
    };
    
    try {
      await updateClient({ id, ...sanitizedData });
      setIsEditing(false);
      setReload(prev => !prev);
    } catch (error) {
      setModal({
        show: true,
        type: "error",
        message: error.response.data.message,
      });
    } finally {
      setIsConfirming(false);
    }
  }

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
              value={client.phone}
              disabled={!isEditing}
              onChange={(e) => setClient({ ...client, phone: e.target.value })}
            />
          </Styled.Field>

          <Styled.Field>
            <CustomInput
              label="Email"
              name="email"
              value={client.email}
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
                {client.updatedAt && <> Atualizado em {new Date(client.updatedAt).toLocaleDateString()}.</>}
              </Styled.Value>
            </Styled.InfoSide>
          </Styled.StatusAndInfo>
        </Styled.InfoGroup>

        {!isEditing ? (
          <Styled.Actions>
            <CustomButton variant="primary" onClick={() => setIsEditing(true)}>
              Editar
            </CustomButton>
            <CustomButton variant="success" onClick={() => navigate(`/agendamento?clienteId=${client.id}`)}>
              Marcar Agendamento para esse Cliente
            </CustomButton>
          </Styled.Actions>
        ) : (
          <Styled.Actions>
            <CustomButton variant="error" onClick={cancelEdition} disabled={isConfirming}>
              Cancelar
            </CustomButton>
            <CustomButton variant="success" onClick={handleConfirm} disabled={isConfirming}>
              {isConfirming ? "Salvando..." : "Confirmar"}
            </CustomButton>
          </Styled.Actions>
        )}

        <CustomModal
          show={modal.show}
          type={modal.type}
          message={modal.message}
          onConfirm={modal.onConfirm}
          onCancel={modal.onCancel}
          onHide={() => setModal({ ...modal, show: false })}
          confirmText={modal.onConfirm ? "Manter anterior" : undefined}
          cancelText={modal.onCancel ? "Continuar editando" : "Fechar"}
        />
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
    justify-content: center;
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
  `
};
