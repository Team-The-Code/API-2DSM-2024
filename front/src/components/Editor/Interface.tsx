import "../../styles/interface.js";
import styled from "styled-components";
import { hideInput, showInput } from "../../styles/interface.js";



export default function Interface(){
     return (
        <WorkspaceSld>
        <div className="container">
  
    <div className="left-panel">
    <h3>Ferramentas</h3>
        <div className="tool">
            <button id="btn-add-vertex" onClick={showInput}>Adicionar Polígono</button>
            <div className="main">
                    <div id="inputContainer" >
                        <input type="text" placeholder="Adicionar polígono..." />
                        <button onClick={hideInput}>Salvar</button>
                    </div>
        </div>
        </div>
        <div className="tool">
            <button id="btn-delete-vertex">Excluir Polígono</button>
        </div>
        <div className="tool">
            <label htmlFor="polygon-category">Categoria do Polígono:</label>
            <select id="polygon-category">
                <option value="exposed-soil">Solo Exposto</option>
                <option value="vegetation-suppression">Supressão de Vegetação</option>
                <option value="new-building">Nova Edificação</option>
            </select>
        </div>
        <div className="tool">
            <button id="btn-save-project">Salvar Projeto</button>
        </div>
    </div>

    
    <div className="workspace">
    <div className="content">
        <h2>Detalhes do Apontamento</h2>
        <table id="appointment-details">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Descrição</th>
                </tr>
            </thead>
            
        </table>
    </div>
    </div>

   
    <div className="right-panel">
        <h3>Apontamentos do Revisor</h3>
        <div className="tool">
            <button id="btn-add-vertex" >Apontamento projeto 1</button>
        </div>
        <div className="tool">
            <button id="btn-delete-vertex">Apontamento projeto 2</button>
        </div>
        <div className="tool">
    </div>
</div>
</div>
        </WorkspaceSld> 
    )
}

export const WorkspaceSld = styled.div`

.content{
    margin-left: 240px;
    margin-top: -60px;
}

.container {
    display: flex;
    height: 100vh;

}

.left-panel {
    position: fixed;
    left: 0;
    width: 250px;
    height: 100vh;
    background-color: #333;
    padding-top: 50px;
    color: #fff;
}

.left-panel h3{
    margin-top: 0;
    padding: 10px;
    text-align: center;
    background-color: #111;
}

.workspace {
    display:flex;
    justify-content: center
    height: 90vh;
    width: 80vw;
    margin: 116px
}

.content{
    display: flex;
    flex-direction: column;
}

.right-panel {
    height: 100vh;
    position: fixed;
    right: 0;
    width: 250px;
    background-color: #333;
    padding-top: 50px;
    color: #fff;
}

.right-panel h3{
    margin-top: 0;
    padding: 10px;
    text-align: center;
    background-color: #111;
}

.right-panel li {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
}

.right-panel li review-note {
    display: block;
    color: #fff;
    text-decoration: none;
    padding: 20px;
}

.review-notes {
    list-style-type: none;
    padding: 10px;
}

.tool {
    margin-bottom: 10px;
    padding: 20px;
  }

  .tool button {
    color: #fff;
    padding: 10px 20px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #333;
  }

  .tool button:hover {
    background: linear-gradient(45deg, #A9A9A9, #808080); 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }

  .tool select {
    width: 100%;
    padding: 10px;

    border: 1px solid #fff;
    border-radius: 4px;
    background-color: #333;
    color: #fff;
  }

  .tool label {
    display: block;
    margin-bottom: 5px;
  }

`