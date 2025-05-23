import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import styled from "styled-components";
import { CustomDateInput, CustomButton, SchedulingTable } from "../../components"; 
import { getAllSchedulingsByBusinessId } from '../../services/schedulings';

export default function SchedulingList() {
  const storedUser = JSON.parse(localStorage.getItem("dataUser") || "{}");
  const businessId = storedUser.user.id;
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    setStartDate(firstDayOfWeek.toISOString().slice(0,10));
    setEndDate(lastDayOfWeek.toISOString().slice(0,10));

    fetchAppointments(firstDayOfWeek, lastDayOfWeek);
  }, []);

  async function fetchAppointments(start, end) {
    try {
      const appointments = await getAllSchedulingsByBusinessId(businessId);
      const filtered = appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate >= start && appointmentDate <= end;
      });

      setAppointments(filtered);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
      setAppointments([]);
    }
  }

  function handleSearch() {
    if (!startDate) return; 

    const start = new Date(startDate);
    let end;

    if (endDate) {
      end = new Date(endDate);
    } else {
      end = new Date(start);
      end.setDate(start.getDate() + 6);
    }

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 7) {
      end = new Date(start);
      end.setDate(start.getDate() + 6);
      setEndDate(end.toISOString().slice(0,10));
    }

    fetchAppointments(start, end);
  }

  function handleClear() {
    setStartDate('');
    setEndDate('');
    setAppointments([]);
  }

  return (
    <MainLayout>
      <Styled.Container>
        <Styled.Title>Agendamentos</Styled.Title>
        <Styled.Filters>
          <CustomDateInput label="Data Inicial" value={startDate} onChange={e => setStartDate(e.target.value)} />
          <CustomDateInput label="Data Final" value={endDate} onChange={e => setEndDate(e.target.value)} />
          <CustomButton variant="primary" onClick={handleSearch}>Pesquisar</CustomButton>
          <CustomButton variant="primary" onClick={handleClear}>Limpar Campos</CustomButton>
          <CustomButton variant="success" onClick={() => navigate('/novo-agendamento')}>Realizar Novo Agendamento</CustomButton>
        </Styled.Filters>

        <Styled.Table>
          <SchedulingTable appointments={appointments} />
        </Styled.Table>
      </Styled.Container>
    </MainLayout>
  );
}

const Styled = {
  Container: styled.div`
    max-width: 900px;
    margin: auto;
  `,
  Title: styled.h2`
    margin-bottom: 1rem;
  `,
  Filters: styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;

    @media (max-width: 600px) {
      flex-direction: column;

      > * {
        width: 100%;
      }
    }
  `,
  Table: styled.div`
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 0.5rem;
        border: 1px solid #ddd;
        text-align: left;
        white-space: nowrap; /* evita quebra que bagunce a tabela */
      }

      th {
        background-color: #f0f0f0;
      }
    }
  `,
};
