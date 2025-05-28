import styled from "styled-components";

export default function CustomInputFormPayment({ payments, setPayments }) {

  const options = [
    { key: 'pix', label: 'Pix' },
    { key: 'credito', label: 'Cartão de Crédito' },
    { key: 'debito', label: 'Cartão de Débito' },
    { key: 'transferencia', label: 'Transferência Bancária' },
    { key: 'dinheiro', label: 'Dinheiro' },
    { key: 'outros', label: 'Outros' },
  ];

  function handleChange(key, value) {
    setPayments(prev => ({
      ...prev,
      [key]: value
    }));
  }

  function handleOutrosDescricaoChange(e) {
    setPayments(prev => ({
      ...prev,
      outrosDescricao: e.target.value
    }));
  }

  return (
    <Styled.Wrapper>
      <Styled.Title>Formas de Pagamento</Styled.Title>
      {options.map(opt => (
        <Styled.CheckItem key={opt.key}>
          <label>
            <input
              type="checkbox"
              checked={payments[opt.key] || false}
              onChange={e => handleChange(opt.key, e.target.checked)}
            />
            {opt.label}
          </label>
        </Styled.CheckItem>
      ))}

      {payments.outros && (
        <Styled.OutrosField>
          <label>Descreva outros meios de pagamento:</label>
          <textarea
            rows="3"
            value={payments.outrosDescricao || ""}
            onChange={handleOutrosDescricaoChange}
          />
        </Styled.OutrosField>
      )}
    </Styled.Wrapper>
  );
}

const Styled = {
  Wrapper: styled.div`
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    flex: 1;  // <-- Adicionado para ocupar todo o espaço disponível
    box-sizing: border-box;
  `,

  Title: styled.h4`
    margin: 0 0 0.5rem 0;
    color: ${({ theme }) => theme.colors.primaryDark};
    font-weight: bold;
  `,

  CheckItem: styled.div`
    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }
  `,

  OutrosField: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    textarea {
      width: 100%;
      resize: vertical;
      padding: 0.5rem;
      border-radius: 4px;
      border: 1px solid ${({ theme }) => theme.colors.inputBorder};
      font-family: inherit;
    }
  `,
};
