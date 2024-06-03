import styled from "styled-components";
import ItemMenu from "../ItemMenu";
import Logo from "../Logo";

export default function Menu() {
  return (
    <Sld>
      <Logo />
      <RightSld>
        <ItemMenu link="/cadastro">Cadastro</ItemMenu>
        <ItemMenu link="/">Login</ItemMenu>
      </RightSld>
    </Sld>
  );
}

const Sld = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 1000; /* Para garantir que o menu esteja acima de outros elementos */
  background-color: #000;
  box-sizing: border-box;
`;

const RightSld = styled.div`
  display: flex;
  flex-direction: row;
`;
