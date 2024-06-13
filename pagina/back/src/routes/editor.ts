import { Router } from "express";
import controller from "../controllers/EditorController";

const routes = Router();
routes.get ("/revisor", controller.listRev)
routes.get ("/", controller.list)




export default routes;