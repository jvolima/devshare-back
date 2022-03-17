import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPostsUseCase } from "./ListPostsUseCase";

class ListPostsController {
  async handle(request: Request, response: Response) {
    const listPostsUseCase = container.resolve(ListPostsUseCase);

    const posts = await listPostsUseCase.execute();

    return response.json(posts);
  }
}

export { ListPostsController }