import { Request, Response } from "express";
import query from "../database/connection";

class ProjectsController {
    public async list (_: Request, res: Response):Promise<void> {
        const response: any = await query(
            `
            SELECT id ,name AS nome,area_km2 AS tamanho from projects
            `
        );
        if(response.length > 0){
            res.json(response);
            console.log(response)
        }else{
            res.json({erro: response.message})
        }
    } 
    public async create (_: Request, res: Response):Promise<void> {
        const response: any = await query(
            `
            name AS nome,area_km2 AS tamanho from projects
            `
        );
        if(response.length > 0){
            res.json(response);
            console.log(response)
        }else{
            res.json({erro: response.message})
        }
    }    
}
export default new ProjectsController