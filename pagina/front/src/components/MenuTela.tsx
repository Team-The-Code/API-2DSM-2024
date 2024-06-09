
import styled from "styled-components";

export default function MenuTela() {
  return (
    <Sld>
      <ImgSld alt="" src="./logo-branca-completa.svg" />
      <RightSld />
    </Sld>
  );
}


export const Sld = styled.div`
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
  font-size: 20px;
  a {
    text-decoration: none;
    color: #fff;
    position: relative;
    padding-right: 20px;

    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -2px;
      height: 2px;
      background-color: #ff6900;
      transition: width 0.3s ease;
      width: 0;
    }

    &:hover::after {
      width: 85%;
    }
  }
`;

const RightSld = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
`;

const ImgSld = styled.img`
  display: flex;
  width: auto;
  height: 50px;
  margin: 0px 40px;
`;
