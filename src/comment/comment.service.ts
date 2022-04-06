import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from 'src/entity/comment.entity';
import { Items } from 'src/entity/items.entity';
import { CreateCommentDto } from 'src/shared/types/comment types/comment-create.dto';
import { GetCommentItemsParamDto } from 'src/shared/types/comment types/comment-get.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  @InjectRepository(Comments)
  private readonly commentRepo: Repository<Comments>;

  @InjectRepository(Items)
  private readonly itemsRepo: Repository<Items>;

  async createComment({
    comment,
    itemId,
    userName,
    replyId,
  }: CreateCommentDto) {
    const item = await this.itemsRepo.find({ where: { id: itemId } });

    if (!item) throw new HttpException(`Item with id ${itemId} not exist`, 404);

    const objectOfCreate = { comment, itemId, userName };

    if (!replyId) return this.commentRepo.save(objectOfCreate);

    const replyComment = await this.commentRepo.findOne({
      where: { id: replyId },
    });

    if (!replyComment)
      throw new HttpException(`Comment with id ${replyId} not exist`, 404);

    return this.commentRepo.save({ ...objectOfCreate, replyId });
  }

  async searchComment({ itemId, limit, offset }: GetCommentItemsParamDto) {
    const item = await this.itemsRepo.find({ where: { id: itemId } });

    if (!item) throw new HttpException(`Item with id ${itemId} not exist`, 404);

    const commentQuery = this.commentRepo.createQueryBuilder('c');
    if (!!offset && !!limit) commentQuery.skip(offset).limit(limit);

    return commentQuery.getMany();
  }
}
