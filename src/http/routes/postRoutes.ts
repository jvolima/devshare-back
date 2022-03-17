import { Router } from "express";
import { CreatePostController } from "../../modules/posts/useCases/createPost/CreatePostController";
import { ListPostsController } from "../../modules/posts/useCases/listPosts/ListPostsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const postRoutes = Router();

const createPostController = new CreatePostController();
const listPostsController = new ListPostsController();

postRoutes.post("/", ensureAuthenticated, createPostController.handle);
postRoutes.get("/", ensureAuthenticated, listPostsController.handle);

export { postRoutes }