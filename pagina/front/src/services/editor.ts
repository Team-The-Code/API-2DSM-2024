import { EditorProps, ErrorProps } from "../types";
import api from "./api";

class Editor {
  /**
   * Fetches a limited list of projects from the API.
   */
  async tarefaEditor(): Promise<EditorProps[] | ErrorProps> {
    try {
      const { data } = await api.get("/editor");
      return data;
    } catch (error: any) {
      return { erro: error.message };
    }
  }
}
const editor = new Editor();
export default editor;