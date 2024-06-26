import { ReactNode } from "react";

export interface LoginProps {
  id: number;
  mail: string;
  profile: string;
  token: string;
}
export interface UserProps {
  id: number;
  mail: string;
  profile: string;
}

export interface Project {
  id: number;
  nome: string;
  tamanho: number;
  geom: string[];
  
}
export interface Grade{
  responsavel:number;
  total:string
  finalizados:string;
  andamento:string

}
export interface Quadrado {
  
  geom: number[][][];
}


export interface Projects {
  projects: Project[];
}

export interface ErrorProps {
  erro: string;
}

export interface GridsByProjectProps {
  idproject: number;
  name: string;
  total_grids: number;
  finished_grids: number;
  total_area: number;
  finished_area: number;
}

export interface MappingByProjectProps {
  idproject: number;
  name: string;
  total_changes: number;
  area_changes: number;
}

export interface PointersByProjectProps {
  finished_pointers: ReactNode;
  idproject: null | undefined;
  finished_grids: any;
  id: number;
  name: string;
  total_pointers: number;
}

export interface UserContextProps {
  users: UserProps[] | null;
  mail: string | null;
  profile: string | null;
  token: string | null;
  login: (mail: string, password: string) => void;
  logout: () => void;
  create: (mail: string, password: string, profile:string) => Promise<void>;
  getUsers: () => void;
  updateProfile: (id: string, profile: string) => void;
  error: ErrorProps | null;
  setError: (error: ErrorProps | null) => void;
  isErrorProps: (object: any) => object is ErrorProps;
  remove: (id:number) => Promise<void>;
}

export interface ProviderProps {
  children: ReactNode;
}
export interface ProjectStats {
  idproject: number;
  name: string;
  total_grids: number;
  finished_grids: number;
  total_area: number;
  finished_area: number;
}
export interface BarChartProps {
  data: MappingByProjectProps[];
  
}
export interface GridsStatsChartProps {
  data: GridsByProjectProps[];
}
export interface PointersStatsChartProps {
  data: PointersByProjectProps[];
}
export interface EditorChartProps {
  data: EditorProps[]; 
}

export interface EditorProps {
  idproject: number,
  name: string,
  total_grids: number,
  finished_grids: number,
  validated_grids: number,
  finished_area: number,
  total_area: number,
  editor_id: number,
  finish_count: number
}
export interface RevisorProps {
 user_revisor:  any |null | undefined;
 validated_count:number;
 in_progress_count:number;
}
export interface RevisorChartProps{
  data: RevisorProps[]; 
}
