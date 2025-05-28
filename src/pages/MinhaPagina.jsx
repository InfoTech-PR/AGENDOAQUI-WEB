import MainLayout from "../layouts/MainLayout";
import { useState, useRef } from "react";
import styled from "styled-components";
import { CustomInput, CustomInputTextArea, CustomInputLocation } from "../components";

export default function MinhaPagina() {
  const [formData, setFormData] = useState({ name: "", description: "", images: [], location: "" });
  const fileInputRef = useRef(null);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData)
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: files,
    }));
  }
  
  function handleImageClick() {
    fileInputRef.current.click();
  }

  const preview = formData.images && formData.images.length > 0 ? URL.createObjectURL(formData.images[0]) : "/upload.jpg";

  return (
    <MainLayout>
      <Styled.Container>
        <Styled.Title>Tela de Minha Pagina</Styled.Title>
        <Styled.Subtitle>Adicione uma ou várias fotos</Styled.Subtitle>

        <Styled.Form>
          <Styled.Line>
            <Styled.Column>
              <Styled.ImageWrapper onClick={handleImageClick}>
                <Styled.Image src={preview} alt="Clique para alterar" />
              </Styled.ImageWrapper>

              <Styled.FileInput
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </Styled.Column>

            <Styled.Column>
              <CustomInput
                label="Nome do Negócio"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <CustomInputTextArea
                label="Descreva seu Negócio"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
              />
            </Styled.Column>
          </Styled.Line>

          <Styled.Line>
            <CustomInputLocation
              label="Localização"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Styled.Line>
        </Styled.Form>
      </Styled.Container>
    </MainLayout>
  );
}

const Styled = {
  Container: styled.div`
    padding: 2rem;
    font-family: sans-serif;
    @media (max-width: 768px) {
      padding: 1rem;
    }
  `,

  Title: styled.h2`
    text-align: left;
    margin-bottom: 1rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primaryDark};
  `,

  Subtitle: styled.h6`
    text-align: left;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primaryDark};
  `,

  Form: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    width: 400px;
    height: 300px;
    cursor: pointer;
    border: 2px dashed #ccc;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
      width: 100%;
      height: 200px;
    }
  `,

  Image: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,

  Line: styled.div`
    display: flex;
    gap: 1rem;
    align-items: stretch;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  `,

  Column: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;

    & > *:last-child {
      flex: 1;
      display: flex;
      flex-direction: column;

      textarea {
        flex: 1;
        height: 100% !important;
      }
    }
  `,
};
