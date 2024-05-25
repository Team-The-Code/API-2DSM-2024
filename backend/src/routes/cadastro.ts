import { Router} from "express";
import user from "./user";
import UserController from "../controllers/UserController";

const routes = Router();
routes.post("/cadastro", UserController.create);

// //aceita qualquer método HTTP ou URL
// routes.use((_: Request, res: Response) =>
//   res.json({ error: "Requisição desconhecida" })
// );



export default routes;