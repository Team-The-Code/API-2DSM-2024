import service from "../../services/UserService";
import useCadastro from "../../hooks";
import styled from "styled-components";
import { UserType } from "../../types";



export default function Cadastro() {
  const {
    nome,
    email,
    senha,
    perfil,
    setNome,
    setEmail,
    setSenha,
    setPerfil,
  } = useCadastro();


  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const r = await service.create(nome, email, senha, perfil);
    console.log("r:", r);

  };
  return (
    <ContainerSld>
    <div className="container">
      <div className="content">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Cadastro de Editor e Revisor</h2>
          <div className="form-group">
            <label htmlFor="option">Escolha o tipo de cadastro: </label>

            <select
              className="input-field"
              value={perfil}
              onChange={(e) => setPerfil(e.target.value as UserType)}
              required
            >
              <option value={UserType.Editor}>Editor</option>
              <option value={UserType.Revisor}>Revisor</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              className="input-field"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder="Digite seu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Cadastrar</button>
        </form>
      </div>
    </div>
    </ContainerSld>
  );
}

export const ContainerSld = styled.div`
.container {
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.content {
display: flex;
justify-content: center;
margin-top: 9%;
}

.top-bar {
  background-color: #ABB8C3;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}

.bottom-bar {
  background-color: #ABB8C3;
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 20px;
}

.logo {
  width: 12%; 
  height: auto; 

}

.button {
  background-color: white;
  color: black;
  border: 3px solid #FF6900;
  padding: 8px 16px;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;

}


.form {
  width: 400px;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.form h2 {
  margin-bottom: 20px;
  color: #ff6900;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label{
  display: block;
  font-size: 16px;
  color: #000;
}

.form-group select{
  width: 105%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #abb8c3;
  border-radius: 4px;
}

.form-group input{
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #abb8c3;
  border-radius: 4px;
}

.submit-button {
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
    background-color: #000; 
    color: #fff; 
  }
`;

