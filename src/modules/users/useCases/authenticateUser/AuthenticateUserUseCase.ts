import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor (
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError("Email or password incorrect.");
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new AppError("Email or password incorrect.");
    }

    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days
    } = auth;

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    });

    const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    await this.usersTokensRepository.create({
      id_user: user.id,
      expires_date: refresh_token_expires_date,
      refresh_token
    });

    const authenticateReturn = {
      user: {
        name: user.name, 
        email
      },
      token: token,
      refresh_token: refresh_token
    };

    return authenticateReturn;
  }
}

export { AuthenticateUserUseCase }