import styled from "styled-components";

export default function CustomHourFormInput({ label, hours, setHours }) {
  function handleDayChange(day, field, value) {
    setHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  }

  const dias = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];

  return (
    <Styled.InputWrapper>
      <Styled.Title>{label}</Styled.Title>
      {dias.map(day => (
        <Styled.DayBlock key={day}>
          <label>
            <input
              type="checkbox"
              checked={hours[day].ativo}
              onChange={e => handleDayChange(day, "ativo", e.target.checked)}
            />{" "}
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </label>

          {hours[day].ativo && (
            <>
              <Styled.HourField>
                <label>Entrada:</label>
                <input
                  type="time"
                  value={hours[day].entrada}
                  onChange={e => handleDayChange(day, "entrada", e.target.value)}
                />
              </Styled.HourField>

              <Styled.HourField>
                <label>Saída:</label>
                <input
                  type="time"
                  value={hours[day].saida}
                  onChange={e => handleDayChange(day, "saida", e.target.value)}
                />
              </Styled.HourField>

              <label>
                <input
                  type="checkbox"
                  checked={hours[day].intervalo}
                  onChange={e => handleDayChange(day, "intervalo", e.target.checked)}
                />{" "}
                Tem intervalo de almoço?
              </label>

              {hours[day].intervalo && (
                <>
                  <Styled.HourField>
                    <label>Início intervalo:</label>
                    <input
                      type="time"
                      value={hours[day].intervaloInicio}
                      onChange={e => handleDayChange(day, "intervaloInicio", e.target.value)}
                    />
                  </Styled.HourField>

                  <Styled.HourField>
                    <label>Fim intervalo:</label>
                    <input
                      type="time"
                      value={hours[day].intervaloFim}
                      onChange={e => handleDayChange(day, "intervaloFim", e.target.value)}
                    />
                  </Styled.HourField>
                </>
              )}
            </>
          )}
        </Styled.DayBlock>
      ))}
    </Styled.InputWrapper>
  );
}

const Styled = {
  Title: styled.h4`
    margin: 0 0 0.5rem 0;
    color: ${({ theme }) => theme.colors.primaryDark};
    font-weight: bold;
  `,

  InputWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  `,

  DayBlock: styled.div`
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
    padding: 1rem;
    border-radius: 4px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,

  HourField: styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;

    label {
      min-width: 120px;
    }

    input[type="time"] {
      flex: 1;
      padding: 0.4rem;
      border: 1px solid ${({ theme }) => theme.colors.inputBorder};
      border-radius: 4px;
      width: 100%;
    }
  `,
};