import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from 'src/entity/comment.entity';
import { Items } from 'src/entity/items.entity';
import { TypeORMError } from 'typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comments, Items])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
