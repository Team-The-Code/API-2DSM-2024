<<<<<<< HEAD
import { ErrorProps, Grade, Projects } from "../types";
=======
// src/services/Projetos.ts

import { ErrorProps, Project } from "../types";
>>>>>>> 87fa98dbaf18c3d154b4dde44f8fad7daa2695af
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
<<<<<<< HEAD
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
=======

  /**
   * Creates a new project by sending coordinates and name to the API.
   * @param name - The name of the project.
   * @param geom - The GeoJSON representation of the project area.
   */
  async create( geomJson: any): Promise<Project | ErrorProps> {
    try {
      const { data } = await api.post("/projetos", { geomJson });
>>>>>>> 87fa98dbaf18c3d154b4dde44f8fad7daa2695af
      return data;
    } catch (error: any) {
      return { erro: error.message };
    }
  }
}

const projetos = new Projectos();
export default projetos;
