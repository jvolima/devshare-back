import { Router } from "express";
import { UpdateUserController } from "../../modules/users/useCases/addBio/UpdateUserController";
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
const updateUserController = new UpdateUserController();

userRoutes.post("/", createUserController.handle);
userRoutes.post("/session", authenticateUserController.handle);
userRoutes.post("/session/refresh-token", refreshTokenController.handle);
userRoutes.get("/me", ensureAuthenticated, userInfosController.handle);
userRoutes.put("/update", ensureAuthenticated, updateUserController.handle);

export { userRoutes }