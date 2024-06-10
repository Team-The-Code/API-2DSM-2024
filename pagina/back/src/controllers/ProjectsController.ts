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
        const resultadosPorPagina = 30;
        // Extrai o número da página da query string, se não estiver presente assume a página 1
        const pagina = parseInt(req.query.page as string, 10) || 1;

        // Calcula o offset com base na página
        const offset = (pagina - 1) * resultadosPorPagina;

        // Consulta para obter os resultados paginados
        const response: any = await query(
            `
        SELECT * FROM public.grids
        WHERE idproject = 3
        AND user_editor IS NOT NULL
        LIMIT ${resultadosPorPagina} OFFSET ${offset}
        `
        );

        // Consulta para obter o número total de resultados
        const totalResponse: any = await query(
            `
        SELECT COUNT(*) AS total FROM public.grids
        WHERE idproject = 3
        AND user_editor IS NOT NULL
        `
        );

        const totalResultados = totalResponse[0].total;

        // Calcula o número total de páginas com base no número total de resultados e resultados por página
        const totalPages = Math.ceil(totalResultados / resultadosPorPagina);

        // Verifica se há resultados
        if (response && response.length > 0) {
            res.json({
                totalPages,
                currentPage: pagina,
                response
            });
        } else {
            res.json({ erro: "Nenhum projeto encontrado." });
        }
    }
}

export default new ProjectsController();
