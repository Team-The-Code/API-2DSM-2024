import styled from "styled-components";

export default function Logo() {
  return (
    <ImgSld
      alt=""
      src="./logo-branca-completa.svg"
    />
  );
}

const ImgSld = styled.img`
  display: flex;
  width: auto;
  height: 50px;
  margin: 0px 40px;
`;
