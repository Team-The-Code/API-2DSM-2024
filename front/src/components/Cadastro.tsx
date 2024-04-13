import { useState } from "react";
import "../styles/telaCadastro.css"

enum UserType {
  Editor = 'editor',
  Revisor = 'revisor',
}

export default function Cadastro (){

    const [userType, setUserType] = useState<UserType>(UserType.Editor);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      console.log('Tipo:', userType);
      console.log('Nome:', nome);
      console.log('Email:', email);
      console.log('Senha:', senha);

      setNome('');
      setEmail('');
      setSenha('');
    }
  
    return (
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Cadastro de Editor e Revisor</h2>
          <div className="form-group">
            <label htmlFor="option">Escolha o tipo de cadastro: </label>

            <select  
              className="input-field" 
              value={userType} 
              onChange={(e) => setUserType(e.target.value as UserType)} 
              required
            >

              <option value={UserType.Editor}>Editor</option>
              <option value={UserType.Revisor}>Revisor</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" className="input-field" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} required/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" className="input-field" placeholder="Digite seu Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" className="input-field" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} required/>
          </div>

          <button type="submit" className="submit-button">Cadastrar</button>
        </form>
      </div>
    );
  };