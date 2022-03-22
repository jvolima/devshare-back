import { Router } from "express";
import { AddBioController } from "../../modules/users/useCases/addBio/AddBioController";
import { AuthenticateUserController } from "../../modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../../modules/users/useCases/createUser/CreateUserController";
import { RefreshTokenController } from "../../modules/users/useCases/refreshToken/RefreshTokenController";
import { UserInfosController } from "../../modules/users/useCases/userInfos/UserInfosController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const userInfosController = new UserInfosController();
const addBioController = new AddBioController();

userRoutes.post("/", createUserController.handle);
userRoutes.post("/session", authenticateUserController.handle);
userRoutes.post("/session/refresh-token", refreshTokenController.handle);
userRoutes.get("/me", ensureAuthenticated, userInfosController.handle);
userRoutes.get("/bio", ensureAuthenticated, addBioController.handle);

export { userRoutes }