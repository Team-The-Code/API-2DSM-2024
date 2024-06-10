import { ErrorProps, Grade, Project, Projects } from "../types";
import api from "./api";

class Projectos {
  /**
   * Fetches a limited list of projects from the API.
   */
  async limitProjects(): Promise<Project[] | ErrorProps> {
    try {
      const { data } = await api.get("/projetos");
      return data;
    } catch (error: any) {
      return { erro: error.message };
    }
  }
  async gradeT(): Promise<Grade[] | ErrorProps> {
    try {
      const { data } = await api.get("/projetos/Taubate");
      return data;
    } catch (error: any) {
      return { erro: error.message };
    }
  }
  async gradeA(): Promise<Grade[] | ErrorProps> {
    try {
      const { data } = await api.get("/projetos/Atibaia");
      return data;
    } catch (error: any) {
      return { erro: error.message };
    }
  }
  async gradeC(): Promise<Grade[] | ErrorProps> {
    try {
      const { data } = await api.get("/projetos/Cruzeiro");
      return data;
    } catch (error: any) {
      return { erro: error.message };
    }
  }
  async create(): Promise<Projects[] | ErrorProps> {
    try {
      const { data } = await api.post("/projetos");
      return data;
    } catch (error: any) {
      return { erro: error.message };
    }
  }
}

const projetos = new Projectos();
export default projetos;
