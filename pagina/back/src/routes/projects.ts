import { Router, Request, Response } from "express";
import controller from "../controllers/ProjectsController";

const routes = Router();
routes.get ("/limitProjects", controller.list)
routes.post("/create", controller.create)

routes.use( (_:Request,res:Response) => res.json({error:"Operação desconhecida de Projetos"}) );

export default routes;