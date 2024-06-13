import { Link } from "react-router-dom";
import styled from "styled-components";

export default function MenuLateral() {
    return (
        <>
        <Sld>
          <nav className="menu-lateral">
              <i className="bi bi-view-list"></i>
            <ul>
              <li className="item-menu">
              <Link to="/estatisticas">Grades</Link>
              </li>
              <li className="item-menu">
              <Link to="/estatisticas/mappingByProject">Mapeamento</Link>
              </li>
              <li className="item-menu">
              <Link to="/estatisticas/pointersByProject">Apontamento por projeto</Link>
              </li>
              <li className="item-menu">
                <Link to="/projetos">Projetos</Link>
              </li>
              <li className="item-menu">
              <Link to="/usuarios">Usuários</Link>
              </li>
              <li className="item-menu">
              </li>
            </ul>
          </nav>
          </Sld>
        </>
      );
  }
 export const Sld = styled.div`
  

nav.menu-lateral {
    width: 13vw;
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
    margin-top:16vh;
    padding-left:10px
}

ul li.item-menu {
    transition: 0.2s;
    padding:15px;

}

ul li.item-menu:hover {
    background-color: #ff6900;
}

ul li.item-menu a {
    color: #fff;
    text-decoration: none;
    font-size: 1.9vw;
    display: flex; 
}

  `
  