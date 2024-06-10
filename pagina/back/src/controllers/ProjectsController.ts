import { Request, Response } from "express";
import query from "../database/connection";
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
        const { geom } = req.body;

        try {
            const coordinates = geom.map((coord: any) => [coord.lng, coord.lat]);

            const geomGeoJSON = {
                type: "MultiPolygon",
                coordinates: [[[...coordinates]]]
            };

            const response: any = await query(
                `
                INSERT INTO projects (id ,name, area_km2, geom) VALUES (?, ?, ST_GeomFromGeoJSON(?))
                `,
                [5, "casa", 160, geomGeoJSON]
            );

            if (response.affectedRows > 0) {
                res.json({ message: "Projeto criado com sucesso." });
            } else {
                res.status(500).json({ erro: "Erro ao criar o projeto." });
            }
        } catch (error) {
            console.error("Error creating project:", error);
            res.status(500).json({ erro: "Erro interno do servidor." });
        }
    };


    public async gradeA(req: Request, res: Response): Promise<void> {
        const response: any = await query(
            `
             SELECT * FROM public.grids
             where idproject = 1
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
    

    public async gradeT(req: Request, res: Response): Promise<void> {
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
    
}

export default new ProjectsController();
