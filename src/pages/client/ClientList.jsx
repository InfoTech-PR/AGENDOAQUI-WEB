import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import styled from "styled-components";
import { CustomInput, CustomButton } from "../../components";
import { useNavigate } from 'react-router-dom'
import { getAllClients } from "../../services/clients";

export default function ClientList() {
  const [search, setSearch] = useState("");
  const [allClients, setAllClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClients() {
      setLoading(true);
      setError(null);
      try {
        const clients = await getAllClients();
        setAllClients(clients);
        setFilteredClients(clients);
      } catch (err) {
        setError("Erro ao carregar clientes.");
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  const handleSearch = () => {
    const filtered = allClients
      .filter((client) =>
        client.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
    setFilteredClients(filtered);
  };

  const handleClear = () => {
    setSearch("");
    setFilteredClients(allClients);
  };

  return (
    <MainLayout>
      <Styled.Container>
        <Styled.Header>
          <Styled.Title>Clientes</Styled.Title>
          <CustomButton onClick={() => navigate("/cadastrar-clientes")}>
            + Adicionar Novos Clientes
          </CustomButton>
        </Styled.Header>

        <Styled.Filters>
          <CustomInput
            label="Nome"
            name="nome"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Styled.Filters>

        <Styled.Buttons>
          <CustomButton onClick={handleSearch} disabled={loading}>
            Pesquisar
          </CustomButton>
          <CustomButton onClick={handleClear} disabled={loading}>
            Limpar Filtros
          </CustomButton>
        </Styled.Buttons>

        {loading && <p>Carregando clientes...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <Styled.Table>
            <thead>
              <tr>
                <th>Nome do Cliente</th>
                <th>Data de Nascimento</th>
                <th>Telefone / Celular</th>
                <th>E-mail</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={4}>Nenhum cliente encontrado.</td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.dob ? new Date(client.dob).toLocaleDateString() : "Não informado"}</td>
                    <td>{client.phone || "Não informado"}</td>
                    <td>{client.email || "Não informado"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Styled.Table>
        )}
      </Styled.Container>
    </MainLayout>
  );
}

const Styled = {
  Container: styled.div`
    padding: 2rem;
    font-family: sans-serif;

    @media (max-width: 768px) {
      padding: 1rem;
    }
  `,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  `,
  Title: styled.h2`
    margin: 0;
    font-size: 1.5rem;
  `,
  Filters: styled.div`
    width: 100%;
    margin-bottom: 1rem;
  `,
  Buttons: styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;

    button {
      flex: 1;
      min-width: 0;
    }

    @media (max-width: 768px) {
      flex-direction: column;

      button {
        width: 100%;
      }
    }
  `,
  Input: styled.input`
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
    max-width: 300px;
  `,
  Button: styled.button`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  `,
  Table: styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;

    th,
    td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ccc;
    }

    th {
      background-color: #f0f0f0;
    }

    @media (max-width: 768px) {
      display: block;

      thead {
        display: none;
      }

      tbody {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      tr {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
      }

      td {
        border: none;
        padding: 0.25rem 0;
      }

      td::before {
        content: attr(data-label);
        font-weight: bold;
        display: block;
        margin-bottom: 0.25rem;
      }
    }
  `
};
