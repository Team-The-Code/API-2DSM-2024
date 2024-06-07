import { Link } from "react-router-dom";
import styled from "styled-components";

export default function MenuLateral() {
    return (
      <Sld>
        <Link to="/estatisticas">Estatísticas</Link>
        <Link to="/usuarios">Usuários</Link>
      </Sld>
    );
  }
 export const Sld = styled.div`
  

nav.menu-lateral {
    width: 10vw;
    height: 100vh;
    background: #5e5e5e;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    transition: 0.2s;
    z-index: 1;
    display: block;

}

ul {
    list-style-type: none;
    padding-left: 2px;
    margin-top:13vh;
}

ul li.item-menu {
    transition: 0.2s;
}

ul li.item-menu:hover {
    background-color: #ff6900;
}

ul li.item-menu a {
    color: #fff;
    text-decoration: none;
    font-size: 2vw;
    display: flex;
   
    
}

ul li.item-menu a .txt-link {
    background-size: cover;
    margin: auto ;
    margin-bottom: 4vh;
    padding-left: 0.2vw;
    font-size: 1.2vw;
    padding-top:30px
    
}

ul li.item-menu a .icon > i {
    font-size: 2vw;
    
}
  `
  