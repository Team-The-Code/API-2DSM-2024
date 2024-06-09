import { ErrorProps, Projects } from "../types";
import api from "./api";

class Projectos {
  async limitProjects(): Promise<Projects[] | ErrorProps> {
    try {
      const { data } = await api.get("/projetos/limitProjects");
      return data;
    } catch (error: any) {
      return { erro: error.message };
    }
  }
}
const projetos = new Projectos();
export default projetos;