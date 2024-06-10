import { useEffect } from "react";
import { useUser } from "../hooks";
import { ErrorBar } from "../components";
import styled from "styled-components";
<<<<<<< HEAD
=======

>>>>>>> 87fa98dbaf18c3d154b4dde44f8fad7daa2695af

export default function ConfigPage() {
  const { error, setError, users, getUsers, remove } = useUser();

  useEffect(() => {
    setError(null);
    if (!users) {
      getUsers(); // obtém os usuários cadastrados
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {error ? <ErrorBar>{error.erro}</ErrorBar> : null}
      <StyledContainer>
        <div>
          <h2>Usuários</h2>
          {users && users.length > 0 ? (
            <ol>
              {users.map((user) => (
                <li key={user.id}>
                  <span>{user.mail}</span>
                  <span>{user.profile}</span>
                  <button onClick={() => remove(user.id)}>Excluir</button>
                </li>
              ))}
            </ol>
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
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

  div {
    background-color: white;
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }

  div:hover {
    box-shadow: 0px 15px 45px rgba(0, 0, 0, 0.2);
  }

  h2 {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
  }

  ol {
    list-style-type: none;
    padding-left: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    border-bottom: 1px solid #eaeaea;
    transition: background-color 0.3s;
  }

  li:hover {
    background-color: #f9f9f9;
  }

  span {
    font-size: 16px;
    color: #666;
  }

  button {
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    background-color: #ff6900;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #e55d00;
  }
`;
