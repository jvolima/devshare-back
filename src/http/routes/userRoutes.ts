import { Router } from "express";
import { AuthenticateUserController } from "../../modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../../modules/users/useCases/createUser/CreateUserController";
import { RefreshTokenController } from "../../modules/users/useCases/refreshToken/RefreshTokenController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

userRoutes.post("/", createUserController.handle);
userRoutes.post("/session", authenticateUserController.handle);
userRoutes.post("/session/refresh-token", refreshTokenController.handle);

export { userRoutes }