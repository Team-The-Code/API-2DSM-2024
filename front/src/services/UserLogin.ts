
import { LoginProps } from "../types";
import api from "./api";

class UserLogin {
   async login(name: string, mail: string, password: string): Promise<LoginProps> {
    try {
      const response = await api.post("http://localhost:3001/login");
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        return response.data; // Se precisar retornar algo do login
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error; // Lançar o erro para que possa ser tratado pelo chamador
    }
  }
}

export default UserLogin;
