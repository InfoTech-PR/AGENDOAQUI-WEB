import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { format, addDays, subDays, startOfWeek, addWeeks } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import CustomModal from "../../components/CustomModal";

const mockAgendamentos = [
    { date: new Date(), hour: "08:00", service: "Consulta", client: "João da Silva" },
    { date: new Date("2025-05-10"), hour: "12:00", service: "Consulta", client: "Mario Henrique" },
];

export default function InitialAdmin() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("dia");
  const [modal, setModal] = useState({ show: false, type: "info", message: "" });

  const goToPrevious = () => {
    setCurrentDate(viewMode === "dia" ? subDays(currentDate, 1) : subDays(currentDate, 7));
  };

  const goToNext = () => {
    setCurrentDate(viewMode === "dia" ? addDays(currentDate, 1) : addDays(currentDate, 7));
  };

  const hours = Array.from({ length: 10 }, (_, i) => `${String(i + 8).padStart(2, "0")}:00`);

  const renderDayView = () => (
    <Table>
      <thead>
        <tr>
          <th>Horário</th>
          <th>{format(currentDate, "EEEE", { locale: ptBR })}</th>
        </tr>
      </thead>
      <tbody>
        {hours.map((hour) => {
          const agendamento = mockAgendamentos.find(a =>
            format(a.date, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd") && a.hour === hour
          );
          return (
            <tr key={hour}>
              <td>{hour}</td>
              <td>
                {agendamento ? (
                  <AgendamentoCell onClick={() => setModal({ show: true, type: "info", message: `${agendamento.service} com ${agendamento.client} às ${agendamento.hour}` })}>
                    <strong>{agendamento.service}</strong>
                    <div>{agendamento.client}</div>
                  </AgendamentoCell>
                ) : "Sem Eventos"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );

  const renderWeekView = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

    return (
      <Table>
        <thead>
          <tr>
            <th>Horário</th>
            {days.map(day => (
              <th key={day}>{format(day, "EE dd", { locale: ptBR })}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map(hour => (
            <tr key={hour}>
              <td>{hour}</td>
              {days.map(day => {
                const agendamento = mockAgendamentos.find(a =>
                  format(a.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd") && a.hour === hour
                );
                return (
                  <td key={day}>
                    {agendamento ? (
                      <AgendamentoCell onClick={() => setModal({ show: true, type: "info", message: `${agendamento.service} com ${agendamento.client} às ${agendamento.hour}` })}>
                        <strong>{agendamento.service}</strong>
                        <div>{agendamento.client}</div>
                      </AgendamentoCell>
                    ) : "Sem Eventos"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <MainLayout>
      <Container>
        <Title>Agendamentos</Title>

        <Tabs>
          <a onClick={() => setViewMode("semana")} className={viewMode === "semana" ? "active" : ""}>Semana</a>
          <a onClick={() => setViewMode("dia")} className={viewMode === "dia" ? "active" : ""}>Dia</a>
        </Tabs>

        <Nav>
          <span onClick={goToPrevious}><FaChevronLeft /></span>
          <div>
            {viewMode === "dia"
              ? `Dia ${format(currentDate, "dd")} (${format(currentDate, "MMMM yyyy", { locale: ptBR })})`
              : `Semana de ${format(startOfWeek(currentDate, { weekStartsOn: 1 }), "dd MMM", { locale: ptBR })}`}
          </div>
          <span onClick={goToNext}><FaChevronRight /></span>
        </Nav>

        {viewMode === "dia" ? renderDayView() : renderWeekView()}

        <CustomModal
          show={modal.show}
          type={modal.type}
          message={modal.message}
          onHide={() => setModal({ ...modal, show: false })}
        />
      </Container>
    </MainLayout>
  );
}

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Nav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  user-select: none;

  svg {
    cursor: pointer;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
  user-select: none;

  a {
    cursor: pointer;
    color: #555;
    text-decoration: none;

    &.active {
      font-weight: bold;
      text-decoration: underline;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ccc;
    padding: 0.75rem;
    text-align: left;
    vertical-align: top;
  }

  th {
    background-color: #eee;
  }
`;

const AgendamentoCell = styled.div`
  background-color: #ddd;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;

  strong {
    display: block;
  }

  div {
    font-size: 0.9rem;
    color: #333;
  }
`;
