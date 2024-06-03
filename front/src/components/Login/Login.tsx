import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerSld } from "../Cadastro/Cadastro";
import api from "../../services/api";

const Login: React.FC = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const credentials = {mail, password};
    try {
      const response = await api.post('/', credentials);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/Interface');
        // Limpa os campos após o envio do formulário
        setMail('');
        setPassword('');
      } else {
        console.log('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      setErrorMessage("Credenciais inválidas. Por favor, tente novamente.");
    }
  };

  return (
    <ContainerSld>
      <div className="container">
        <div className="content">
          <form className="form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" className="input-field" placeholder="Digite seu Email" value={mail} onChange={(e) => setMail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha:</label>
              <input type="password" id="password" className="input-field" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="submit-button">Entrar</button>
          </form>
        </div>
      </div>
    </ContainerSld>
  );
};

export default Login;
