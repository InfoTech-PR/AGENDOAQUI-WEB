import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import defaultUserImg from "/user.png";
import { FaBars } from "react-icons/fa";
import { CustomButton, CustomLink } from '../components'

export default function Header({ onToggleSidebar }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("dataUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.user);
      setProfileImage(parsedUser.user.image ? `${import.meta.env.VITE_BASE_URL_PROFILE}/${parsedUser.user.image}` : null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("dataUser");
    navigate("/");
  };

  if (!user) {
    return (
      <Styled.Header>
        <Styled.MenuButton onClick={onToggleSidebar}>
          <FaBars />
        </Styled.MenuButton>

        <Styled.TopSection>
          <Styled.LinkGroup>
            <CustomLink href="/login-negocios">Central do Negócio</CustomLink>
            <CustomLink href="/registro-negocios">Promova seu Negócio Também!</CustomLink>
          </Styled.LinkGroup>
          <Styled.RightButtons>
            <CustomButton onClick={() => navigate("/register")}>Cadastrar</CustomButton>
            <CustomButton onClick={() => navigate("/login")}>Entrar</CustomButton>
          </Styled.RightButtons>

        </Styled.TopSection>

        <Styled.BottomSection>
          <Styled.ImageWrapper>
            <img
              src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
              alt="Imagem do Negócio"
            />
          </Styled.ImageWrapper>
          <Styled.SearchWrapper>
            <input placeholder="Digite o Nome do Negócio ou a Categoria" />
          </Styled.SearchWrapper>
        </Styled.BottomSection>
      </Styled.Header>
    );
  }

  return (
    <Styled.HeaderContainer>
      <Styled.MenuButton onClick={onToggleSidebar}>
        <FaBars />
      </Styled.MenuButton>
      <Styled.UserInfo>
        <Styled.UserName>{user?.name}</Styled.UserName>
        <Styled.UserButton onClick={() => setMenuOpen(!isMenuOpen)}>
          <img src={profileImage || defaultUserImg} alt="Usuário" />
        </Styled.UserButton>
        {isMenuOpen && (
          <Styled.UserMenu>
            <Styled.MenuItem>{user.email}</Styled.MenuItem>
            <Styled.MenuItem onClick={() => navigate("/profile")}>Editar Perfil</Styled.MenuItem>
            <Styled.MenuItem onClick={handleLogout}>Logout</Styled.MenuItem>
          </Styled.UserMenu>
        )}
      </Styled.UserInfo>
    </Styled.HeaderContainer>
  );
}

const Styled = {
  Header: styled.header`
    background-color:${({ theme }) => theme.colors.primary};
    color: white;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    margin: 1rem;

    @media (max-width: 600px) {
      padding: 0.5rem;
    }
  `,
  TopSection: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
    }
  `,
  LinkGroup: styled.div`
    display: flex;
    gap: 1.5rem;

    a {
      font-size: 1.1rem;
      margin: 0;
    }

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: center;

      a {
        font-size: 1rem;
      }
    }
  `,
  RightButtons: styled.div`
    display: flex;
    gap: 0.5rem;

    @media (max-width: 600px) {
      justify-content: center;
      width: 100%;
    }
  `,
  BottomSection: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: center; // Corrigido aqui
      width: 100%; // Garante que ocupe largura total
    }
  `,
  ImageWrapper: styled.div`
    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 8px;

      @media (max-width: 600px) {
        width: 40px;
        height: 40px;
      }
    }
  `,
  SearchWrapper: styled.div`
    flex: 1;

    input {
      width: 100%;
      padding: 0.5rem;
      border-radius: 6px;
      border: none;
      font-size: 1rem;

      @media (max-width: 600px) {
        font-size: 0.9rem;
      }
    }
  `,
  HeaderContainer: styled.header`
    height: 60px;
    width: calc(100% - 2rem);
    margin: 1rem auto;
    background-color:rgb(131, 131, 131);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    color: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  `,
  MenuButton: styled.button`
    background: transparent;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    display: block;

    @media (min-width: 768px) {
      display: none;
    }
  `,
  UserInfo: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-left: auto;
  `,
  UserName: styled.span`
    margin-right: 0.8rem;
    font-weight: 500;
    font-size: 1rem;
    color: #fff;
  `,
  UserButton: styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
    }
  `,
  UserMenu: styled.div`
    position: absolute;
    top: 50px;
    right: 0;
    background: #2a2a2a;
    border-radius: 8px;
    padding: 0.5rem 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    z-index: 10;
    min-width: 160px;
  `,
  MenuItem: styled.div`
    padding: 0.75rem 1.2rem;
    color: white;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #3a3a3a;
    }
  `,
};
