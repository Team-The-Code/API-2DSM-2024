import { useState } from "react"
import { useUser } from "../hooks";
import styled from "styled-components";
import MenuTela from "../components/MenuTela";

export default function LoginPage() {
    const [mail, setMail] = useState("root@visiona.com.br");
    const [password, setPassword] = useState("123456");
    const { login } = useUser();

    function handle() {
        login(mail, password);
    }

    return <>
        <MenuTela />
        <ContainerSld>
            <div className="container">
                <div className="content">
                    <form className="form">
                        <h2>Login</h2>
                        <div className="form-group">
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" id="email" className="input-field" placeholder="Digite seu Email" value={mail} onChange={(e) => setMail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <input type="password" id="password" className="input-field" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <button type="submit" className="submit-button" onClick={() => handle()}>Logar</button>
                        </div>
                    </form>
                </div>
            </div>
        </ContainerSld>
    </>
}
const ContainerSld = styled.div`
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
  .form-group input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #abb8c3;
    border-radius: 4px;
    transition: border-color 0.3s;
  }
    .form-group input:focus {
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
.top-bar {
    background - color: #ABB8C3;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
  }

.bottom-bar {
    background - color: #ABB8C3;
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
    background - color: white;
    color: black;
    border: 3px solid #FF6900;
    padding: 8px 16px;
    border-radius: 4px;
    margin-left: 10px;
    cursor: pointer;
  
}


 `;