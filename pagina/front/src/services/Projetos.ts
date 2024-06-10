// src/services/Projetos.ts

import { ErrorProps, Project } from "../types";
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

  /**
   * Creates a new project by sending coordinates and name to the API.
   * @param name - The name of the project.
   * @param geom - The GeoJSON representation of the project area.
   */
  async create( geomJson: any): Promise<Project | ErrorProps> {
    try {
      const { data } = await api.post("/projetos", { geomJson });
      return data;
    } catch (error: any) {
      return { erro: error.message };
    }
  }
}

const projetos = new Projectos();
export default projetos;
