import { Request, Response } from "express";
import query from "../database/connection";
class ProjectsController {
    public async list(_: Request, res: Response): Promise<void> {
        const response: any = await query(
            `
            SELECT id ,name AS nome,area_km2 AS tamanho from projects
            `
        );
        if (response.length > 0) {
            res.json(response);
            console.log(response)
        } else {
            res.json({ erro: response.message })
        }
    }
    public async create(req: Request, res: Response): Promise<void> {
        const { coordinates } = req.body;
    
        // Verifica se 'coordinates' e 'coordinates.coordinates' estão presentes
        if (!coordinates || !coordinates.coordinates) {
            res.status(400).json({ error: "Invalid data provided. 'coordinates' array is required." });
            return;
        }
    
        try {
            // Convertendo o objeto GeoJSON para string JSON
            const geomStr = JSON.parse(coordinates);
            res.json(geomStr)
    
            // Inserindo os dados no banco de dados e calculando a área
            const response: any = await query(
                `INSERT INTO projects (geom) 
                 VALUES (ST_GeomFromGeoJSON($1))`,
                [geomStr]
            );
    
            // Verifica se a inserção foi bem-sucedida
            if (response.rowCount > 0) {
                res.json({ message: "Projeto criado com sucesso." });
            } else {
                res.status(500).json({ error: "Erro ao criar o projeto." });
            }
        } catch (error) {
            console.error("Error creating project:", error);
            res.status(500).json({ error: "Erro interno do servidor." });
        }
    }
    
}
export default new ProjectsController