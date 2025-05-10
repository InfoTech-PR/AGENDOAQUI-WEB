import styled, { keyframes } from "styled-components";

export default function CustomSelect({ options, loading, value, onChange, variant = "primary", ...props }) {
  return (
    <SelectWrapper variant={variant} {...props}>
      {loading ? (
        <SpinnerIcon />
      ) : (
        <select value={value} onChange={onChange} disabled={loading}>
          <option value="" disabled>
            Categoria
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </SelectWrapper>
  );
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;  
  max-width: 400px;  
  margin-top: 10px;
  margin-bottom: 10px;

  select {
    background-color: ${({ theme }) => theme.colors.inputBg};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
    padding: 0.8rem 0.75rem;
    border-radius: 6px;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    cursor: pointer;
    width: 100%;
    min-width: 180px;
    box-sizing: border-box;
    text-align: left;

    &:focus {
      background-color: ${({ theme }) => theme.colors.selectFocusBg || theme.colors.inputFocusBg};
      border-color: ${({ theme }) => theme.colors.primary};
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.disabledBg};
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;

const SpinnerIcon = styled.div`
  animation: ${spin} 1s linear infinite;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;
