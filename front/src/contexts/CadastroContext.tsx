import { createContext, useState} from "react";
import { CadastroProps, UserType } from "../types";

export const CadastroContext = createContext({} as CadastroProps);

export function CadastroProvider({ children }: any) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [perfil, setPerfil] = useState<UserType>(UserType.Usuario);


  return (
    <CadastroContext.Provider
      value={{
      nome,
      email,
      senha,
      perfil,
      setNome,
      setEmail,
      setSenha,
      setPerfil,
      }}
    >
      {children}
    </CadastroContext.Provider>
  );
}
