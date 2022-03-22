import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id: id_user } = request.user;
    const { bio, name } = request.query;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute({
      id_user, 
      bio: bio as string, 
      name: name as string 
    });

    return response.send();
  }
}