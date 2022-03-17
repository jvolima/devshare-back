import { Post } from "@prisma/client";
import { ICreatePostDTO } from "../dtos/ICreatePostDTO";

interface IPostsRepository {
  create({ id_user, content }: ICreatePostDTO): Promise<void>
  list(): Promise<Post[]>
}

export { IPostsRepository }