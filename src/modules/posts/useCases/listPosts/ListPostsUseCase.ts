import { inject, injectable } from "tsyringe";
import { IPostsRepository } from "../../repositories/IPostsRepository";

@injectable()
class ListPostsUseCase {
  constructor (
    @inject("PostsRepository")
    private postsRepository: IPostsRepository
  ) {}

  async execute() {
    const posts = await this.postsRepository.list();

    const recentToLatestPosts = posts.sort(function (a, b) {
      return b.created_at.getTime() - a.created_at.getTime();
    })

    return posts;
  }
}

export { ListPostsUseCase }