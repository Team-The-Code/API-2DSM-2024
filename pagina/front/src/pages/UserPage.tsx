import { useEffect, useState } from "react";
import { useUser } from "../hooks";
import { ErrorBar } from "../components";
import styled from "styled-components";

export default function UserPage() {
  const { error, setError, users, getUsers } = useUser();
  const [mail, setMail] = useState("a@teste.com");
  const [password, setPassword] = useState("123456");
  const [profile, setProfile] = useState("user");
  const { create, remove } = useUser();

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
        <div className="content">
          <label>E-mail:</label>
          <input value={mail} onChange={(e) => setMail(e.target.value)} />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="option">Escolha o tipo de cadastro: </label>
          <select value={profile} onChange={(e) => setProfile(e.target.value)}>
            <option value="adm">Administrador</option>
            <option value="user">Usuário</option>
          </select>
        </div>
        <div>
          <button onClick={() => handleCreate()}>Criar usuário</button>
        </div>
        <div>
          <h4>Usuários</h4>
          {users && users.length > 0 && (
            <ol>
              {users.map((user) => (
                <li key={user.id}>
                  {user.mail} {user.profile}
                  <button onClick={() => remove(user.id)}>Excluir</button>
                </li>
              ))}
            </ol>
          )}
        </div>
      </StyledContainer>

      <div>Excluir usuário Alterar perfil do usuário</div>
      
    </>
  );
}

const StyledContainer = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;

  .content {
    display: flex;
    justify-content: center;
    margin-top: 9%;
  }

  label {
    display: block;
    font-size: 16px;
    color: #000;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #abb8c3;
    border-radius: 4px;
  }

  select {
    width: 105%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #abb8c3;
    border-radius: 4px;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #ff6900;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #000;
    color: #fff;
  }
`;