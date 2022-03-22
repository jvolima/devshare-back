import { User } from ".prisma/client";
import prismaClient from "../../../../prisma";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

interface UpdateUser {
  id_user: string;
  name?: string;
  bio?: string;
}

class UsersRepository implements IUsersRepository {
  async create({ name, email, password }: ICreateUserDTO): Promise<void> {
    await prismaClient.user.create({
      data: {
        name,
        email,
        password
      }
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        email
      }
    });

    return user as User;
  }

  async findById(id_user: string): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        id: id_user
      }
    });

    return user as User;
  }

  async updateUser({ id_user, bio, name }: UpdateUser): Promise<void> {
    await prismaClient.user. update({
      where: {
        id: id_user
      },
      data: {
        bio, 
        name
      }
    })
  }
}

export { UsersRepository }