import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { io } from "../../../../http/app";
import { ICreatePostDTO } from "../../dtos/ICreatePostDTO";
import { IPostsRepository } from "../../repositories/IPostsRepository";

@injectable()
class CreatePostUseCase {
  constructor (
    @inject("PostsRepository")
    private postsRepository: IPostsRepository
  ) {}

  async execute({ id_user, content }: ICreatePostDTO) {
    if(content.trim().length < 1) {
      throw new AppError("At least 1 caracter");   
    };

    const post = await this.postsRepository.create({
      id_user,
      content
    });

    io.emit("new_post", post);

    return post;
  }
}

export { CreatePostUseCase }