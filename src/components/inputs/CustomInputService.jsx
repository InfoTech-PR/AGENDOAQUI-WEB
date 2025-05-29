import { useRef } from "react";
import styled from "styled-components";
import { CustomInput, CustomInputTextArea, CustomButton,CustomInputPrice, CustomHourInput } from "../";

export default function CustomInputService({
  serviceData,
  onChange,
  onConfirm,
  onCancel,
  preview
}) {
  const fileInputRef = useRef(null);

  function handleImageClick() {
    fileInputRef.current.click();
  }

  return (
    <Styled.Wrapper>
      <Styled.Line>
        <Styled.Column>
          <Styled.ImageWrapper onClick={handleImageClick}>
            <Styled.Image src={preview} alt="Clique para alterar" />
          </Styled.ImageWrapper>

          <Styled.FileInput
            type="file"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            onChange={onChange}
          />
        </Styled.Column>

        <Styled.Column>
          <CustomInput
            label="Nome do Serviço"
            name="name"
            value={serviceData.name}
            onChange={onChange}
          />
          <CustomInputTextArea
            label="Resumo do Serviço"
            name="summary"
            value={serviceData.summary}
            onChange={onChange}
          />
        </Styled.Column>

        <Styled.Column>
          <CustomInputPrice
            label="Valor"
            name="price"
            value={serviceData.price}
            onChange={onChange}
          />
          <CustomHourInput
            label="Tempo de Serviço (horas:minutos)"
            name="duration"
            value={serviceData.duration}
            onChange={onChange}
          />
          <Styled.ButtonGroup>
            <CustomButton onClick={onConfirm}>Confirmar</CustomButton>
            <CustomButton variant="error" onClick={onCancel}>Cancelar</CustomButton>
          </Styled.ButtonGroup>
        </Styled.Column>
      </Styled.Line>
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
    flex: 1; 
    box-sizing: border-box;
  `,
  
  Line: styled.div`
    display: flex;
    gap: 1rem;
    align-items: stretch;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  `,

  ButtonGroup: styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    justify-content: center;      /* centraliza horizontalmente */
    align-items: center;          /* centraliza verticalmente */
  `,
  
  Column: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,

  FileInput: styled.input`
    position: absolute !important;
    width: 0 !important;
    height: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
    overflow: hidden !important;
    border: 0 !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(100%) !important;
    white-space: nowrap !important;
    display: none !important;
  `,

  ImageWrapper: styled.div`
    width: 100%;
    max-width: 400px;
    height: auto;
    aspect-ratio: 4 / 3;
    cursor: pointer;
    border: 2px dashed #ccc;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
      max-width: 100%;
      aspect-ratio: 16 / 9;
    }
  `,

  Image: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
};
