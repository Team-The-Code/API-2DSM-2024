export interface UserProps {
  id: number;
  name: string;
  mail: string;
  profile: string;
}

export enum UserType {
  Editor = "editor",
  Revisor = "revisor",
}
export interface CadastroProps {
  nome:string;
  email:string;
  senha:string;
  perfil:UserType;
  setNome: (value: string) => void;
  setEmail: (value: string) => void;
  setSenha: (value: string) => void;
  setPerfil: (value: UserType) => void;
}






