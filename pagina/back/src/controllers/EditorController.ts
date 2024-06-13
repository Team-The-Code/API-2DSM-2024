import { Request, Response } from "express";
import query from "../database/connection";

class EditorController {
  public async list(_: Request, res: Response): Promise<void> {
    const { id } = res.locals;
    console.log(id) // Presumo que res.locals contém o id do projeto
    try {
      const response: any = await query(
        `
    
        SELECT 
        b.id AS idproject, 
        b.name, 
        COUNT(*)::integer AS total_grids, -- quantidade de grades do projeto
        COALESCE(c.finished, 0)::integer AS finished_grids, -- quantidade de grades finalizadas do projeto
        COALESCE(d.validated, 0)::integer AS validated_grids, -- quantidade de grades validadas do projeto
        COALESCE(c.finished_area, 0) AS finished_area, -- área das grades finalizadas do projeto
        b.area_km2 AS total_area, -- área do projeto
        COALESCE(e.user_editor, 0) AS editor_id, -- ID do editor
        COALESCE(e.finish_count, 0)::integer AS finish_count -- quantidade de finalizações por editor
    FROM 
        grids AS a
    JOIN 
        projects AS b ON a.idproject = b.id
    LEFT JOIN (
        SELECT 
            idproject, 
            COUNT(*) AS finished,
            SUM(area_km2) AS finished_area
        FROM 
            grids
        WHERE 
            status = 'finalizado'
        GROUP BY 
            idproject
    ) AS c 
    ON a.idproject = c.idproject
    LEFT JOIN (
        SELECT 
            idproject,
            COUNT(*) AS validated
        FROM 
            grids
        WHERE 
            status_val = 'finalizado'
        GROUP BY 
            idproject
    ) AS d 
    ON a.idproject = d.idproject
    LEFT JOIN (
        SELECT 
            idproject,
            user_editor,
            COUNT(*) AS finish_count
        FROM 
            grids
        WHERE 
            status = 'finalizado'
        GROUP BY 
            idproject, user_editor
    ) AS e 
    ON a.idproject = e.idproject
    WHERE
        e.user_editor = $1-- Aqui deve ser substituído por um valor específico de use_editor
    GROUP BY 
        b.id, b.name, c.finished, c.finished_area, d.validated, e.user_editor, e.finish_count
    ORDER BY 
        b.name;
        `,
        [id]
      );

      if (response && response.length > 0) {
        res.json(response);
        console.log(response);
      } else {
        res.json({ erro: "Nenhum projeto encontrado." });
      }
    } catch (error) {
      console.error("Erro ao listar projetos:", error);
      res.status(500).json({ erro: "Ocorreu um erro ao processar a solicitação." });
    }
  }
}

export default new EditorController();
