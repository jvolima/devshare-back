import { Router } from "express";
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

userRoutes.post("/", createUserController.handle);
userRoutes.post("/session", authenticateUserController.handle);
userRoutes.post("/session/refresh-token", refreshTokenController.handle);
userRoutes.get('/me', ensureAuthenticated, userInfosController.handle);

export { userRoutes }