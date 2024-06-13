import { Router } from "express";
import controller from "../controllers/EditorController";

const routes = Router();
routes.get ("/", controller.list)




export default routes;