import React from "react";
import styled from "styled-components";
import { FloatingLabel, Form } from "react-bootstrap";

export default function CustomDateInput({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder = "",
  controlId,
  disabled = false,
}) {
  return (
    <DateInputWrapper
      as={FloatingLabel}
      controlId={controlId || name}
      label={label}
      className="mb-3"
    >
      <Form.Control
        type="date"
        placeholder={placeholder || label}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        min="1900-01-01"
        max="2100-12-31"
      />
    </DateInputWrapper>
  );
}

const DateInputWrapper = styled.div`
  .form-control {
    background-color: ${({ theme }) => theme.colors.inputBg};
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
    color: ${({ theme }) => theme.colors.text};
    padding: 0.8rem 0.75rem;
    border-radius: 4px;
    transition: background-color 0.2s ease;
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
