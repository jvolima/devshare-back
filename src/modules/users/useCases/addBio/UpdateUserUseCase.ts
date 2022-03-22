import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface UpdateUser {
  id_user: string;
  name?: string;
  bio?: string;
}

@injectable()
export class UpdateUserUseCase {
  constructor (
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({id_user, bio, name}: UpdateUser) {
    if(bio) {
      if(bio.length <= 0) {
        throw new AppError("Bio needs to have at least 2 characters!");
      }
    }

    if(name) {
      if(name.length <= 0) {
        throw new AppError("Name needs to have at least 2 characters!");
      }
    }

    await this.usersRepository.updateUser({ id_user, bio, name });
  }
}