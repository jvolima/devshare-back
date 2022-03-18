import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserInfosUseCase } from "./UserInfosUseCase";

class UserInfosController {
  async handle(request: Request, response: Response) {
    const { id: id_user } = request.user;

    const userInfosUseCase = container.resolve(UserInfosUseCase);

    const userInfos = await userInfosUseCase.execute(id_user);

    return response.json(userInfos);
  }
}

export { UserInfosController }
