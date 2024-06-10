import { Router, Request, Response } from "express";
import controller from "../controllers/ProjectsController";

const routes = Router();
routes.get ("/", controller.list)
routes.post("/", controller.create)
<<<<<<< HEAD
routes.get("/Taubate", controller.gradeT)
routes.get("/Cruzeiro", controller.gradeC)
routes.get("/Atibaia", controller.gradeA)

=======
>>>>>>> 87fa98dbaf18c3d154b4dde44f8fad7daa2695af



export default routes;