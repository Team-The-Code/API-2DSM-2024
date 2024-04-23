import "../styles/interface.js";
import "../styles/interface.css";
import { useState } from "react";
import {showInput, hideInput } from "../styles/interface.js";



export default function Interface(){
 
    
    const [pesquisar, setPesquisar] = useState("");
    
    return (
        <div className="content">
            <aside className="sidebar">
                <button onClick={showInput}>Opção 1</button>
                <button onClick={showInput}>Opção 2</button>
                <button onClick={showInput}>Opção 3</button>
                <div className="main">
                    <div id="inputContainer" >
                        <input type="text" placeholder="Digite algo..." />
                        <button onClick={hideInput}>Fechar</button>
                    </div>
                </div>
            </aside>
            <div className="main">
                <input type="text" id="name" className="input-field"  value={pesquisar} onChange={(e) => setPesquisar(e.target.value)} placeholder="Pesquisar..." />
                <table>
                    <thead>
                        <tr>
                            <th>Coluna 1</th>
                            <th>Coluna 2</th>
                            <th>Coluna 3</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    )
}