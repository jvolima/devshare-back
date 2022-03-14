import { container } from "tsyringe";
import "./providers";
import { UsersRepository } from "../../modules/users/repositories/implementations/UsersRepository";
import { UsersTokensRepository } from "../../modules/users/repositories/implementations/UsersTokensRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../modules/users/repositories/IUsersTokensRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
)