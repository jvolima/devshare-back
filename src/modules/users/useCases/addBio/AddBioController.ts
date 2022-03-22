import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddBioUseCase } from "./AddBioUseCase";

export class AddBioController {
  async handle(request: Request, response: Response) {
    const { id: id_user } = request.user;
    const { bio } = request.body;

    const addBioUseCase = container.resolve(AddBioUseCase);

    await addBioUseCase.execute(id_user, bio);

    return response.send();
  }
}