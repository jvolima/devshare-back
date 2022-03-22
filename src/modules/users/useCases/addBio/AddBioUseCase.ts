import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class AddBioUseCase {
  constructor (
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id_user: string, bio: string) {
    if(bio.length <= 0) {
      throw new AppError('Bio needs to have at least 2 characters!')
    }

    await this.usersRepository.updateBio(id_user, bio);
  }
}