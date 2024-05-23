import { hideInput, showInput } from "../../styles/interface";
import { WorkspaceSld } from "../Editor/Interface";




export default function Interface(){
     return (
        <WorkspaceSld>
        <div className="container">
  
    <div className="left-panel">
    <h3>Ferramentas</h3>
    <div className="tool">
            <button id="btn-add" onClick={showInput}>Adicionar pontos de erro</button>
            <div className="main">
                    <div id="inputContainer" >
                        <input type="text" placeholder="Mensagem de erro..." />
                        <button onClick={hideInput}>Salvar</button>
                    </div>
        </div>
        </div>
        <div className="tool">
            <label htmlFor="category">Status do projeto:</label>
            <select id="category">
                <option value="finalizado">Finalizado</option>
                <option value="em andamento">Em andamento</option>
            </select>
        </div>
        <div className="tool">
            <button id="btn-save-project">Enviar</button>
        </div>
    </div>

    
    <div className="workspace">
    <div className="content">
        <h2>Detalhes do Projeto</h2>
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
        <h3>Projetos</h3>
        <div className="tool">
            <button id="btn-add-vertex" >Editor 1</button>
        </div>
        <div className="tool">
            <button id="btn-delete-vertex">Editor 2</button>
        </div>
        <div className="tool">
    </div>
</div>
</div>
        </WorkspaceSld> 
    )
}

