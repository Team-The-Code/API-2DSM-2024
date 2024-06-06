import { Router, Request, Response } from "express";
import controller from "../controllers/StatsController";

const routes = Router();

// Quantidade de grades por projeto e quantidade de grades finalizadas no projeto
routes.get("/gridsByProject", controller.gridsByProject);
// Quantidade de mapeamentos (changes) por projeto 
routes.get("/mappingByProject", controller.mappingByProject);
// Quantidade de apontamentos (pointers) por projeto 
routes.get("/pointersByProject", controller.pointersByProject);

//aceita qualquer método HTTP ou URL
routes.use( (_:Request,res:Response) => res.json({error:"Operação desconhecida de estatísticas"}) );

export default routes;