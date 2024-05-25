import { Router } from "express";
import UserController from "../controllers/UserController";

const routes = Router();
routes.post("/login", UserController.login);

//aceita qualquer método HTTP ou URL
// routes.use((_: Request, res: Response) =>
//   res.json({ error: "Requisição desconhecida" })
// );



export default routes;
