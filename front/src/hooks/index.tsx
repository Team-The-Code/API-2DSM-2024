import { useContext } from "react";
import { CadastroContext } from "../contexts/CadastroContext";
import { LoginContext } from "../contexts/LoginContext";

export default function useCadastro(){
    return useContext(CadastroContext);
}


export function useLogin(){
    return useContext(LoginContext);
}