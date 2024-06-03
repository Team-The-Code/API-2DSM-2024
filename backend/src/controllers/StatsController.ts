import { Request, Response } from "express";
import query from "../database/connection";

class StatsController {
  // Quantidade de grades por projeto, quantidade de grades finalizadas no projeto,
  // área do projeto e área das grades finalizadas do projeto 
  public async gridsByProject(_: Request, res: Response): Promise<void> {
    const response: any = await query(
      `
      SELECT 
        b.id AS idproject, 
        b.name, 
        COUNT(*)::integer AS total_grids, -- quantidade de grades do projeto
        COALESCE(c.finished, 0)::integer AS finished_grids, -- quantidade de grades finalizadas do projeto
        b.area_km2 AS total_area, -- área do projeto
        COALESCE(c.finished_area, 0) AS finished_area -- área das grades finalizadas do projeto
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
      GROUP BY 
          b.id, b.name, c.finished, c.finished_area
      ORDER BY 
          b.name  
      `
    );

    if (response.length > 0) {
      res.json(response);
    } else {
      res.json({ erro: response.message });
    }
  }

  // Quantidade de mapeamentos (changes) por projeto 
  public async mappingByProject(_: Request, res: Response): Promise<void> {
    const response: any = await query(
      `
      select b.id AS idproject, b.name, 
      count(a.*)::integer AS "total_changes", -- quantidade de mapeamentos por projeto
      sum(a.area_km2)::float AS "area_changes" -- área mapeada por projeto
      from changes as a, projects as b
      where a.idproject = b.id
      group by b.id, b.name
      order by b.name
      `
    );

    if (response.length > 0) {
      res.json(response);
    } else {
      res.json({ erro: response.message });
    }
  }

  // Quantidade de apontamentos por projeto 
  public async pointersByProject(_: Request, res: Response): Promise<void> {
    const response: any = await query(
      `
      select b.id, b.name, count(a.*)::integer AS "total_pointers"
      from pointers as a, projects as b
      where a.idproject = b.id
      group by b.id, b.name
      order by b.name
      `
    );

    if (response.length > 0) {
      res.json(response);
    } else {
      res.json({ erro: response.message });
    }
  }
}

export default new StatsController();
