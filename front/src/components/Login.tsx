import { useState } from "react";
import "../styles/interface.css";

export default function Login (){

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      console.log('Nome:', nome);
      console.log('Email:', email);
      console.log('Senha:', senha);

      setNome('');
      setEmail('');
      setSenha('');
    }
  
    return (
      <div className="container">
        <div className="content">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
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
          <button type="submit" className="submit-button">Entrar</button>
        </form>
        </div>
      </div>
    );
  };