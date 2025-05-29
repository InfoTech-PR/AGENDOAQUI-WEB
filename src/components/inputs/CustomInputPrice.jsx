import React, { useState } from "react";
import styled from "styled-components";
import { FloatingLabel, Form } from "react-bootstrap";

export default function CustomInputPrice({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder = "",
  controlId,
  disabled = false,
}) {
  const [inputValue, setInputValue] = useState(value || "");

  // Enquanto digita, atualiza valor bruto (sem formatação)
  function handleInputChange(e) {
    const val = e.target.value;

    // Permite apenas números, vírgulas e pontos
    const cleaned = val.replace(/[^\d.,]/g, "");

    setInputValue(cleaned);

    // Atualiza o valor externo sem formatação para controle externo
    onChange({
      ...e,
      target: { ...e.target, name, value: cleaned },
    });
  }

  // Ao sair do input, formata para moeda BRL e atualiza valor externo
  function handleBlur(e) {
    let val = inputValue;

    if (!val) {
      setInputValue("");
      onChange({
        ...e,
        target: { ...e.target, name, value: "" },
      });
      return;
    }

    // Troca vírgula por ponto para parsear número
    const normalized = val.replace(",", ".");

    const numberValue = parseFloat(normalized);

    if (isNaN(numberValue)) {
      setInputValue(val);
      return;
    }

    // Formata para moeda
    const formatted = numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    setInputValue(formatted);

    onChange({
      ...e,
      target: { ...e.target, name, value: formatted },
    });
  }

  // Sincroniza valor externo com estado local
  React.useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  return (
    <InputWrapper
      as={FloatingLabel}
      controlId={controlId || name}
      label={label}
      className="mb-3"
    >
      <Form.Control
        type="text"
        placeholder={placeholder || label}
        name={name}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        required={required}
        disabled={disabled}
      />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  .form-control {
    background-color: ${({ theme }) => theme.colors.inputBg};
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
    color: ${({ theme }) => theme.colors.text};
    padding: 0.8rem 0.75rem;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);

    &:disabled {
      background-color: ${({ theme }) => theme.colors.disabledBg};
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  .form-control:focus {
    background-color: #fff;
    box-shadow: none;
  }

  label {
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  .form-control:focus ~ label {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
