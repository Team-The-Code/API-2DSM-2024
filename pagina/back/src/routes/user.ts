import { Router, Request, Response } from "express";
import controller from "../controllers/UserController";
import { checkAdm } from "../middlewares";

const routes = Router();
// somente o próprio usuário pode acessar
routes.put("/mail", controller.updateMail);
routes.put("/senha", controller.updatePassword);

// somente o adm pode acessar
routes.get("/", checkAdm, controller.list);
routes.post("/", checkAdm, controller.create);
routes.delete("/:iduser", checkAdm, controller.delete);

routes.put("/perfil", checkAdm, controller.updateProfile);

//aceita qualquer método HTTP ou URL
routes.use( (_:Request,res:Response) => res.json({error:"Operação desconhecida com o usuário"}) );

export default routes;