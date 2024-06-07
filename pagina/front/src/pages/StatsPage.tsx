import styled from "styled-components";
import { Sld } from "../components/MenuLateral";

export default function StatsPage() {
  return (
    <>
    <Sld>
      <nav className="menu-lateral">
          <i className="bi bi-view-list"></i>
        <ul>
          <li className="item-menu">
            <a href="botao">
              <span className="icon">
                <i className="bi bi-lightbulb"></i>
              </span>
              <span className="txt-link">Estatisticas</span>
            </a>
          </li>
          <li className="item-menu">
            <a href="botao">
              <span className="icon">
                <i className="bi bi-book"></i>
              </span>
              <span className="txt-link">Usuários</span>
            </a>
          </li>
          <li className="item-menu">
            <a href="botao">
              <span className="icon">
                <i className="bi bi-person-badge"></i>
              </span>
              <span className="txt-link">Botão</span>
            </a>
          </li>
          <li className="item-menu">
            <a href="botao">
              <i className="bi bi-person-raised-hand"></i>
              <span className="txt-link">Botão</span>
            </a>
          </li>
          <li className="item-menu">
            <a href="botao">
              <span className="icon">
                <i className="bi bi-person-walking"></i>
              </span>
              <span className="txt-link">Botão</span>
            </a>
          </li>
          <li className="item-menu">
            <a href="botao">
              <span className="icon">
                <i className="bi bi-people-fill"></i>
              </span>
              <span className="txt-link">Botão</span>
            </a>
          </li>
          <li className="item-menu">
            <a href="botao">
              <span className="icon">
                <i className="bi bi-archive"></i>
              </span>
              <span className="txt-link">Botão</span>
            </a>
          </li>
        </ul>
      </nav>
      </Sld>
    </>
  );
}



