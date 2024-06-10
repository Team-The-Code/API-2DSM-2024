import { Router, Request, Response } from "express";
import controller from "../controllers/ProjectsController";

const routes = Router();
routes.get ("/", controller.list)
routes.post("/", controller.create)
routes.get("/Taubate", controller.gradeT)
routes.get("/Cruzeiro", controller.gradeC)
routes.get("/Atibaia", controller.gradeA)



routes.use( (_:Request,res:Response) => res.json({error:"Operação desconhecida de Projetos"}) );

export default routes;