import { UserToken } from "@prisma/client";
import prismaClient from "../../../../prisma";
import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepository implements IUsersTokensRepository {
  async create({ 
    id_user, 
    refresh_token, 
    expires_date 
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = await prismaClient.userToken.create({
      data: {
        id_user, 
        refresh_token, 
        expires_date 
      }
    });

    return userToken;
  }

  async findByUserIdAndRefreshToken(id_user: string, refresh_token: string): Promise<UserToken> {
    const userToken = await prismaClient.userToken.findFirst({
      where: {
        id_user,
        refresh_token
      }
    });

    return userToken as UserToken;
  }

  async deleteById(id: string): Promise<void> {
    await prismaClient.userToken.delete({
      where: { id }
    })
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = await prismaClient.userToken.findFirst({
      where: { refresh_token }
    });

    return userToken as UserToken;
  }
}

export { UsersTokensRepository }