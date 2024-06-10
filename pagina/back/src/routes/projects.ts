import { Router, Request, Response } from "express";
import controller from "../controllers/ProjectsController";

const routes = Router();
routes.get ("/", controller.list)
routes.post("/", controller.create)



export default routes;