import React, { useState } from "react";
import styled from "styled-components";

export default function CustomInputLocation({ label, name, value, onChange, required = false }) {
  const [locationObtained, setLocationObtained] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleGeolocation() {
    if (!navigator.geolocation) {
      setError("Geolocalização não suportada.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const locationString = `Lat: ${lat}, Lng: ${lng}`;
        setInputValue(locationString);
        setLocationObtained(true);
        setInputDisabled(true);
        setLoading(false);
        onChange({ target: { name, value: locationString } });
      },
      (err) => {
        console.error("Erro ao obter localização:", err);
        setError("Não foi possível obter a localização. Digite manualmente.");
        setLoading(false);
      }
    );
  }

  function handleChange(e) {
    setInputValue(e.target.value);
    onChange(e);
  }

  return (
    <InputWrapper>
      <label htmlFor={name}>{label}</label>
      <div className="input-group">
        <input
          id={name}
          name={name}
          type="text"
          className="form-control"
          placeholder={
            locationObtained
              ? "Localização coletada"
              : "Digite: CEP + Rua + Bairro + Número"
          }
          value={inputValue}
          onChange={handleChange}
          disabled={inputDisabled}
          required={required}
        />
        <button
          type="button"
          onClick={handleGeolocation}
          disabled={inputDisabled || loading}
        >
          {loading ? "⏳" : "📍"}
        </button>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  width: 100%;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  .input-group {
    display: flex;
    width: 100%;
    gap: 0.5rem;
    align-items: center;
  }

  .form-control {
    flex: 1;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.inputBg};
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
    color: ${({ theme }) => theme.colors.text};
    padding: 0.8rem 0.75rem;
    border-radius: 4px;
    transition: background-color 0.2s ease;
  }

  button {
    padding: 0.8rem;
    border: none;
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    height: 100%;
    white-space: nowrap;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;

const ErrorMessage = styled.p`
  margin-top: 0.5rem;
  color: red;
  font-size: 0.9rem;
`;
