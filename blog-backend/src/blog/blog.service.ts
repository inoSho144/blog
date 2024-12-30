import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async getPosts(): Promise<Post[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }
  async getPost(postID: string): Promise<Post> {
    const post = await this.postModel.findById(postID).exec();
    return post;
  }

  async addPost(CreatePostDto: CreatePostDto): Promise<Post> {
    const newPost = await this.postModel.create(CreatePostDto);
    return newPost.save();
  }

  async editPost(postID: string, createPostDto: CreatePostDto): Promise<Post> {
    const editedPost = await this.postModel.findByIdAndUpdate(
      postID,
      createPostDto,
      { new: true },
    );
    return editedPost;
  }

  async deletePost(postID: string): Promise<any> {
    const deletePost = await this.postModel.findByIdAndDelete(postID);
    return deletePost;
  }
}
