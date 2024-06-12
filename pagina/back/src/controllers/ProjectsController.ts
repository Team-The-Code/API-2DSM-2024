import { Request, Response } from "express";
import query from "../database/connection";
import wellknown from 'wellknown';
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

  public async gradeA(req: Request, res: Response): Promise<void> {
    try {
        const response: any = await query(
            `
            SELECT
                geom as geom
            FROM
                public.grids
            WHERE
                idproject = 1
                AND user_editor IS NOT NULL;
            `
        );

        if (response && response.length > 0) {
            // Converter cada WKB para pares de coordenadas lat/long
            const dataWithCoordinates = response.map((row: any) => {
                const geomString: string = row.geom;
                const coordinates: number[][] = [];
                
                // Removendo o prefixo WKB e o tipo de geometria
                const trimmedHex = geomString.slice(8);
                
                // Iterar através da string hexadecimal para extrair coordenadas
                for (let i = 0; i < 9; i++) { // Iterar apenas 9 vezes (9 pares de coordenadas)
                    const latHex: string = trimmedHex.slice(i * 32, i * 32 + 8);
                    const lonHex: string = trimmedHex.slice(i * 32 + 8, i * 32 + 16);
                    const lat: number = parseInt(latHex, 16) / 10000000; // Converter de hex para graus
                    const lon: number = parseInt(lonHex, 16) / 10000000; // Converter de hex para graus
                    coordinates.push([lat, lon]);
                }
                
                return { ...row, coordinates };
            });

            res.json(dataWithCoordinates);
            console.log(dataWithCoordinates);
        } else {
            res.status(404).json({ error: "Nenhum projeto encontrado." }); // Mudança: Código de status 404 para indicar que nenhum projeto foi encontrado
        }
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        res.status(500).json({ error: "Erro ao buscar dados." });
    }
}


  public async gradeC(req: Request, res: Response): Promise<void> {
    const response: any = await query(
      `
             SELECT * FROM public.grids
             where idproject = 2
             and user_editor  is not null 
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
             SELECT * FROM public.grids
             where idproject = 3
             and user_editor  is not null 
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
