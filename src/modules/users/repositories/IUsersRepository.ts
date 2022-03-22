import { User } from ".prisma/client";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface UpdateUser {
  id_user: string;
  name?: string;
  bio?: string;
}

interface IUsersRepository {
  create({ name, email, password }: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User>
  findById(id_user: string): Promise<User>
  updateUser({ id_user, bio, name }: UpdateUser): Promise<void>
}

export { IUsersRepository }