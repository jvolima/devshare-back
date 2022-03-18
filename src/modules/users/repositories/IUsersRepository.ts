import { User } from ".prisma/client";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUsersRepository {
  create({ name, email, password }: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User>
  findById(id_user: string): Promise<User>
}

export { IUsersRepository }