import { Link } from "react-router-dom";
import "./index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Dados } from "../../types";
import html2pdf from "html2pdf.js";

export default function Atibaia() {
  const [analistas, setAnalistas] = useState<Dados[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Dados[]>(
          "http://localhost:3001/StatusAtibaia"
        );
        setAnalistas(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados dos analistas:", error);
      }
    };

    fetchData();
  }, []);

  const handlePrintContent = () => {
    var screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    var screenHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    const divMeio = document.querySelector(".relatorio");
    if (divMeio) {
      const opt = {
        margin: 1,
        filename: "relatorioAtibaia.pdf",
        image: { type: "jpeg", quality: 100 },
        html2canvas: { scale: 4 }, // Ajuste a escala para 1
        jsPDF: {
          unit: "px",
          format: [screenWidth, screenHeight],
          orientation: "portrait",
        },
      };

      html2pdf().from(divMeio).set(opt).save();
    }
  };

  return (
    <div className="menu">
      <div className="navbar">
        <div className="border-bottom"></div>
        {/* Quadrado ao lado direito com cargo e status */}
        <div className="border-bottom"></div>
      </div>
      <div className="meio">
        <div className="home"></div>
        <div className="relatorio">
          <h2>Relatório: (Entregas Atibaia e Cruzeiro)</h2>
          <table>
            <thead>
              <tr>
                <th>Analista</th>
                <th>Finalizado</th>
                <th>Não Finalizado</th>
                <th>Validado</th>
                <th>Não Validado</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeamento dos dados dos analistas para gerar as linhas da tabela */}
              {analistas.map((analister, index) => (
                <tr key={index}>
                  <td>{analister.atribuicao}</td>
                  <td>{analister.finalizados}</td>
                  <td>{analister.nao_finalizados}</td>
                  <td>{analister.validados}</td>
                  <td>{analister.nao_validados}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="end_button">
          <section className="actions">
            <Link to="/interface"><button>Voltar</button></Link>
            <button onClick={handlePrintContent}>Imprimir Conteúdo</button>
            <Link to="/login"><button>Desconectar</button></Link>
          </section>
        </div>
      </div>
    </div>
  );
}
