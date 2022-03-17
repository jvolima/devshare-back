import { Router } from "express";
import { postRoutes } from "./postRoutes";
import { userRoutes } from "./userRoutes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/posts", postRoutes);

export { routes }