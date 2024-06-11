import { Router, Request, Response } from "express";
import userController from "../controllers/UserController";
import user from "./user";
import { checkAdm, validadeAcess } from "../middlewares";
import stats from "./stats";
import projects from "./projects";
import ProjectsController from "../controllers/ProjectsController";

const routes = Router();

routes.post("/login", userController.login);
routes.use("/usuario", validadeAcess, user);
// somente o adm pode acessar
routes.use("/estatisticas", validadeAcess, checkAdm, stats);
routes.use("/projetos",validadeAcess,checkAdm,projects )

routes.get('/editor', validadeAcess, ProjectsController.getProjects);
//aceita qualquer método HTTP ou URL
routes.use( (_:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;