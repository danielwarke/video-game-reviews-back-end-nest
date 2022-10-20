import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateUpdateCommentDto } from './dto/create-update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(createCommentDto: CreateUpdateCommentDto): Promise<Comment> {
    const createdComment = new this.commentModel(createCommentDto);
    return createdComment.save();
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async findOne(): Promise<Comment> {
    return this.commentModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateCommentDto: CreateUpdateCommentDto) {
    const comment = await this.commentModel.findById(id);
    if (!comment) {
      throw new NotFoundException();
    }

    if (comment.user.toString() !== updateCommentDto.userId) {
      throw new UnauthorizedException();
    }

    comment.body = updateCommentDto.body;
    return comment.save();
  }

  async delete(id: string) {
    return await this.commentModel.findByIdAndRemove({ _id: id }).exec();
  }
}
