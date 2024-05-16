import { Router } from "express";
import UserController from "../controllers/UserController";


const routes = Router();

routes.post("/", UserController.create);
routes.post("/login", UserController.login);
routes.delete("/", UserController.delete);
routes.put("/", UserController.update);

export default routes;
