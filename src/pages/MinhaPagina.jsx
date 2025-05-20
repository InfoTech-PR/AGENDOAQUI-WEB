import MainLayout from "../layouts/MainLayout";
import styled from "styled-components";

export default function MinhaPagina() {
  return (
    <MainLayout>
      <Styled.Container>
        Tela de Minha Pagina
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
};
