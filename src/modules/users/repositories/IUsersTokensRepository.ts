import { UserToken } from "@prisma/client"
import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO"

interface IUsersTokensRepository {
  create({ id_user, refresh_token, expires_date }: ICreateUserTokenDTO): Promise<UserToken>
  findByUserIdAndRefreshToken(id_user: string, refresh_token: string): Promise<UserToken>
  deleteById(id: string): Promise<void>
  findByRefreshToken(refresh_token: string): Promise<UserToken>
}

export { IUsersTokensRepository }