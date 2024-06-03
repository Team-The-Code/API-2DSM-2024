import { createContext, useState} from "react";
import { LoginProps } from "../types";

export const LoginContext = createContext({} as LoginProps);

export function LoginProvider({ children }: any) {
    const [mail, setEmail] = useState("");
    const [password, setSenha] = useState("");
  

  return (
    <LoginContext.Provider
      value={{
      mail,
      password,
      setEmail,
      setSenha,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}