import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IPayload {
  email: string;
  sub: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor (
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(refresh_token: string) {
    const { email, sub } = verify(refresh_token, auth.secret_refresh_token) as IPayload;

    const id_user = sub;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      id_user, 
      refresh_token
    );

    if(!userToken) {
      throw new AppError("Refresh token does not exists!", 404);
    }

    await this.usersTokensRepository.deleteById(userToken.id);
    
    const newRefreshToken = sign({ email }, auth.secret_refresh_token, {
      subject: id_user,
      expiresIn: auth.expires_in_refresh_token
    });

    const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days);

    await this.usersTokensRepository.create({
      id_user,
      refresh_token: newRefreshToken,
      expires_date
    });

    const newToken = sign({}, auth.secret_token, {
      subject: id_user,
      expiresIn: auth.expires_in_token
    });

    return {
      refresh_token: newRefreshToken,
      token: newToken
    }
  }
}

export { RefreshTokenUseCase }