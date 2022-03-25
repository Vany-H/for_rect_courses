import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from 'src/shared/types/comment types/comment-create.dto';
import { GetCommentItemsParamDto } from 'src/shared/types/comment types/comment-get.dto';
import { CommentService } from './comment.service';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(@Body() body: CreateCommentDto) {
    return this.commentService.createComment(body);
  }

  @Get('/:item_id')
  async itemComment(@Param() body: GetCommentItemsParamDto) {}
}
