import { Request, Response } from "express";
import query from "../database/connection";
import wkx from 'wkx'
import proj4 from 'proj4';
class ProjectsController {
  public async list(_: Request, res: Response): Promise<void> {
    const response: any = await query(
      `
            SELECT id, name AS nome, area_km2 AS tamanho from projects
            `
    );
    if (response && response.length > 0) {
      res.json(response);
      console.log(response);
    } else {
      res.json({ erro: "Nenhum projeto encontrado." });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { multiPolygonString } = req.body

    const response: any = await query(
      `
                INSERT INTO projects (id ,name, area_km2, geom) VALUES (?, ?, ?,?) RETURN *
                `,
      [5, "casa", 160, multiPolygonString]
    );

    if (response.affectedRows > 0) {
      res.json({ message: "Projeto criado com sucesso." });
    } else {
      res.status(500).json({ erro: "Erro ao criar o projeto." });
    }
  }


  

  public async gradeA(_: Request, res: Response): Promise<void> {
    const response: any = await query(
      `
        SELECT 
          distinct(user_editor) as responsavel

,
           count(status) as total,
          count(CASE WHEN status = 'finalizado'THEN 1 END) as finalizados,
          count(CASE WHEN status = 'andamento'THEN 1 END) as Andamento
          from grids
        where idproject = 1 and user_editor is not null group by user_editor;

            `
    );
    if (response && response.length > 0) {
      res.json(response);
      console.log(response);
    } else {
      res.json({ erro: "Nenhum projeto encontrado." });
    }
  }
  
  public async gradeC(req: Request, res: Response): Promise<void> {
    const response: any = await query(
      `
              SELECT 
          distinct(user_editor) as responsavel

,
           count(status) as total,
          count(CASE WHEN status = 'finalizado'THEN 1 END) as finalizados,
          count(CASE WHEN status = 'andamento'THEN 1 END) as Andamento
          from grids
        where idproject = 2 and user_editor is not null group by user_editor;
            `
    );
    if (response && response.length > 0) {
      res.json(response);
      console.log(response);
    } else {
      res.json({ erro: "Nenhum projeto encontrado." });
    }
  }

  public async gradeT(_: Request, res: Response): Promise<void> {
    const response: any = await query(
      `
             SELECT 
          distinct(user_editor) as responsavel

,
           count(status) as total,
          count(CASE WHEN status = 'finalizado'THEN 1 END) as finalizados,
          count(CASE WHEN status = 'andamento'THEN 1 END) as Andamento
          from grids
        where idproject = 3 and user_editor is not null group by user_editor; 
            `
    );
    if (response && response.length > 0) {
      res.json(response);
      console.log(response);
    } else {
      res.json({ erro: "Nenhum projeto encontrado." });
    }
  }
  public async getProjects(_: Request, res: Response): Promise<void> {
    const { id } = res.locals;
    const response = await query(
      `SELECT * FROM projects 
           WHERE id IN (SELECT idproject FROM grids WHERE user_editor = $1 OR user_revisor = $1)`,
      [id]
    );
    res.json(response.rows);
  }
}

export default new ProjectsController();
