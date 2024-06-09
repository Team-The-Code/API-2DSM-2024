import { useEffect, useState } from "react";
import { useUser } from "../hooks";
import { ErrorBar } from "../components";
import styled from "styled-components";

export default function UserPage() {
  const { error, setError, users, getUsers } = useUser();
  const [mail, setMail] = useState("a@teste.com");
  const [password, setPassword] = useState("123456");
  const [profile, setProfile] = useState("user");
  const { create} = useUser();

  useEffect(() => {
    setError(null);
    if (!users) {
      getUsers(); //obtém os usuários cadastrados
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = () => {
    if (!mail) {
      setError({ erro: "Forneça o e-mail" });
    } else if (!password) {
      setError({ erro: "Forneça a senha" });
    } else {
      create(mail, password, profile);
    }
  };

  return (
    <>

      {error ? <ErrorBar>{error.erro}</ErrorBar> : <></>}

      <StyledContainer>
        <div className="container">
          <div className="content">
            <form className="form">
              <h2>Cadastro de Editor e Revisor</h2>
              <div className="form-group">
                <label htmlFor="option">Escolha o tipo de cadastro: </label>
                <select value={profile} onChange={(e) => setProfile(e.target.value)}>
                  <option value="adm">Administrador</option>
                  <option value="user">Usuário</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail:</label>
                <input type="email"
                  id="email"
                  className="input-field"
                  placeholder="Digite seu Email" value={mail} onChange={(e) => setMail(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha:</label>
                <input
                  type="password" id="password"
                  className="input-field"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="submit-button" onClick={() => handleCreate()}>Cadastrar</button>
            </form>
          </div>
        </div>
      </StyledContainer>

    </>
  );
}

const StyledContainer = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;

  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .content {
    display: flex;
    justify-content: center;
    margin-top: 5%;
  }

  .form {
    width: 400px;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    background-color: white;
    transition: box-shadow 0.3s ease;
  }

  .form:hover {
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.2);
  }

  .form h2 {
    margin-bottom: 20px;
    color: #ff6900;
    text-align: center;
    font-size: 24px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    font-size: 16px;
    color: #333;
    margin-bottom: 5px;
  }

  .form-group input,
  .form-group select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #abb8c3;
    border-radius: 4px;
    transition: border-color 0.3s;
  }

  .form-group input:focus,
  .form-group select:focus {
    border-color: #ff6900;
    outline: none;
  }

  .submit-button {
    width: 100%;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #ff6900;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .submit-button:hover {
    background-color: #e55d00;
  }
`;