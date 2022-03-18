import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface UserInfos {
  name: string;
  email: string;
}

@injectable()
class UserInfosUseCase {
  constructor (
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id_user: string) {
    const user = await this.usersRepository.findById(id_user);

    const userInfos: UserInfos = {
      name : user.name,
      email : user.email
    };

    return userInfos;
  }
}

export { UserInfosUseCase }