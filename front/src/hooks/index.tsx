import { useContext } from "react";
import { CadastroContext } from "../contexts/CadastroContext";

export default function useCadastro(){
    return useContext(CadastroContext);
}