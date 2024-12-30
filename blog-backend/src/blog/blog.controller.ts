import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipe';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('posts')
  async getPosts(@Res() res) {
    const post = await this.blogService.getPosts();
    return res.status(200).json(post);
  }

  @Get('post/:postID')
  async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
    const post = await this.blogService.getPost(postID);
    if (!post) throw new NotFoundException('post does not  exist!');
    return res.status(200).json(post);
  }

  @Post('/post')
  async addPost(@Res() res, @Body() createPostDTO: CreatePostDto) {
    const post = await this.blogService.addPost(createPostDTO);
    return res.status(201).json({
      message: 'Post has been created successfully',
      post,
    });
  }

  @Put('/edit')
  async editPost(
    @Res() res,
    @Query('postID') postID,
    @Body() createPostDTO: CreatePostDto,
  ) {
    const post = await this.blogService.editPost(postID, createPostDTO);
    if (!post) throw new NotFoundException('Post does not exist!');
    return res.status(200).json({
      message: 'Post has been successfully updated',
      post,
    });
  }

  @Delete('/delete')
  async deletePost(
    @Res() res,
    @Query('postID', new ValidateObjectId()) postID,
  ) {
    const post = await this.blogService.deletePost(postID);
    if (!post) throw new NotFoundException('Post does not exist');
    return res.status(200).json({
      message: 'Post has been deleted',
      post,
    });
  }
}
