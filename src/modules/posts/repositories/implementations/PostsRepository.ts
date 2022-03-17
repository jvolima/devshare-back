import { Post } from "@prisma/client";
import prismaClient from "../../../../prisma";
import { ICreatePostDTO } from "../../dtos/ICreatePostDTO";
import { IPostsRepository } from "../IPostsRepository";

class PostsRepository implements IPostsRepository {
  async create({ id_user, content }: ICreatePostDTO): Promise<void> {
    await prismaClient.post.create({
      data: {
        id_user,
        content
      }
    });
  };

  async list(): Promise<Post[]> {
    const posts = await prismaClient.post.findMany();

    return posts;
  }
}

export { PostsRepository }