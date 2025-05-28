import { useState } from "react";
import styled from "styled-components";

export default function CustomInputLocation({ label, name, value = {}, onChange, required = false }) {
  const [formData, setFormData] = useState({
    cep: value.cep || "",
    bairro: value.bairro || "",
    rua: value.rua || "",
    numero: value.numero || "",
  });

  const [error, setError] = useState("");

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "cep" && value.length === 8) {
      fetchAddress(value);
    } else {
      emitChange({ ...formData, [name]: value });
    }
  }

  function fetchAddress(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.erro) {
          setError("CEP não encontrado.");
          return;
        }
        const updatedData = {
          ...formData,
          cep,
          bairro: data.bairro,
          rua: data.logradouro,
        };
        setFormData(updatedData);
        emitChange(updatedData);
        setError("");
      })
      .catch(() => {
        setError("Erro ao consultar o CEP.");
      });
  }

  function emitChange(data) {
    onChange({ target: { name, value: data } });
  }

  return (
    <Styled.InputWrapper>
      <Styled.Title>{label}</Styled.Title>
      <div className="input-group">
        <input
          type="text"
          name="cep"
          placeholder="CEP"
          value={formData.cep}
          onChange={handleInputChange}
          required={required}
          maxLength={8}
          className="form-control"
        />
        <input
          type="text"
          name="bairro"
          placeholder="Bairro"
          value={formData.bairro}
          onChange={handleInputChange}
          required={required}
          className="form-control"
        />
        <input
          type="text"
          name="rua"
          placeholder="Rua"
          value={formData.rua}
          onChange={handleInputChange}
          required={required}
          className="form-control"
        />
        <input
          type="text"
          name="numero"
          placeholder="Número"
          value={formData.numero}
          onChange={handleInputChange}
          required={required}
          className="form-control"
        />
      </div>
      {error && <Styled.ErrorMessage>{error}</Styled.ErrorMessage>}
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
    width: 100%;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primaryDark};
    }

    .input-group {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 0.5rem;
      width: 100%;
    }

    .form-control {
      background-color: ${({ theme }) => theme.colors.inputBg};
      border: 1px solid ${({ theme }) => theme.colors.inputBorder};
      color: ${({ theme }) => theme.colors.text};
      padding: 0.8rem 0.75rem;
      border-radius: 4px;
      transition: background-color 0.2s ease;
      width: 100%;
    }
  `,

  ErrorMessage: styled.p`
    margin-top: 0.5rem;
    color: red;
    font-size: 0.9rem;
  `,
};