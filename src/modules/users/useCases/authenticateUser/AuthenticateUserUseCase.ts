import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

@injectable()
class AuthenticateUserUseCase {
  constructor (
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
}

export { AuthenticateUserUseCase }