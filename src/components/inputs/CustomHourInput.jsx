import React from "react";
import styled from "styled-components";
import { FloatingLabel, Form } from "react-bootstrap";

export default function CustomHourInput({
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
    <HourInputWrapper
      as={FloatingLabel}
      controlId={controlId || name}
      label={label}
      className="mb-3"
    >
      <Form.Control
        type="time"
        placeholder={placeholder || label}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </HourInputWrapper>
  );
}

const HourInputWrapper = styled.div`
  .form-control {
    background-color: ${({ theme }) => theme.colors.inputBg};
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
    color: ${({ theme }) => theme.colors.text};
    padding: 0.8rem 0.75rem;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1);
    
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
