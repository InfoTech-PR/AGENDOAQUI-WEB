import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { format, addDays, subDays, startOfWeek } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { parseISO } from "date-fns";

const hours = Array.from({ length: 10 }, (_, i) => `${String(i + 8).padStart(2, "0")}:00`);

export default function SchedulingTable({ appointments }) {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("dia");

  const goToPrevious = () => {
    setCurrentDate(viewMode === "dia" ? subDays(currentDate, 1) : subDays(currentDate, 7));
  };

  const goToNext = () => {
    setCurrentDate(viewMode === "dia" ? addDays(currentDate, 1) : addDays(currentDate, 7));
  };

  const handleRedirect = (id) => {
    navigate(`/detalhes-agendamentos/${id}`);
  };

  const renderDayView = () => (
    <Table>
      <thead>
        <tr>
          <th>Horário</th>
          <th>{format(currentDate, "EEEE, dd/MM/yyyy", { locale: ptBR })}</th>
        </tr>
      </thead>
      <tbody>
        {hours.map(hour => {
          const appt = appointments.find(a =>
            format(parseISO(a.date), "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd") && a.hour.slice(0,5) === hour
          );
          return (
            <tr key={hour}>
              <td>{hour}</td>
              <td>
                {appt ? (
                  <AgendamentoCell onClick={() => handleRedirect(appt.id)}>
                    <strong>{appt.Service.name}</strong>
                    <div>{appt.Client.name}</div>
                  </AgendamentoCell>
                ) : ""}
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
              <th key={day.toISOString()}>{format(day, "EE dd/MM", { locale: ptBR })}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map(hour => (
            <tr key={hour}>
              <td>{hour}</td>
              {days.map(day => {
                const appt = appointments.find(a =>
                  format(parseISO(a.date), "yyyy-MM-dd") === format(day, "yyyy-MM-dd") && a.hour.slice(0,5) === hour
                );
                return (
                  <td key={day.toISOString()}>
                    {appt ? (
                      <AgendamentoCell onClick={() => handleRedirect(appt.id)}>
                        <strong>{appt.Service.name}</strong>
                        <div>{appt.Client.name}</div>
                      </AgendamentoCell>
                    ) : ""}
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
    <>
      <Tabs>
        <a onClick={() => setViewMode("semana")} className={viewMode === "semana" ? "active" : ""}>Semana</a>
        <a onClick={() => setViewMode("dia")} className={viewMode === "dia" ? "active" : ""}>Dia</a>
      </Tabs>

      <Nav>
        <span onClick={goToPrevious}><FaChevronLeft /></span>
        <div>
          {viewMode === "dia"
            ? `Dia ${format(currentDate, "dd")} (${format(currentDate, "MMMM yyyy", { locale: ptBR })})`
            : `Semana de ${format(startOfWeek(currentDate, { weekStartsOn: 1 }), "dd MMM yyyy", { locale: ptBR })}`}
        </div>
        <span onClick={goToNext}><FaChevronRight /></span>
      </Nav>

      {viewMode === "dia" ? renderDayView() : renderWeekView()}
    </>
  );
}

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
