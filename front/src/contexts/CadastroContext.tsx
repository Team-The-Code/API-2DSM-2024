import { createContext, useState} from "react";
import { CadastroProps, UserType } from "../types";

export const CadastroContext = createContext({} as CadastroProps);

export function CadastroProvider({ children }: any) {
    const [nome, setNome] = useState("Maria");
    const [email, setEmail] = useState("maria@teste.com");
    const [senha, setSenha] = useState("123");
    const [perfil, setPerfil] = useState<UserType>(UserType.Editor);


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
