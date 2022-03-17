import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePostUseCase } from "./CreatePostUseCase";

class CreatePostController {
  async handle(request: Request, response: Response) {
    const { id: id_user } = request.user;
    const { content } = request.body;

    const createPostUseCase = container.resolve(CreatePostUseCase);

    await createPostUseCase.execute({
      id_user,
      content
    });

    return response.status(201).send();
  }
}

export { CreatePostController }