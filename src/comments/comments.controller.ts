import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './schemas/comment.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUpdateCommentDto } from './dto/create-update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createCommentDto: CreateUpdateCommentDto,
    @Request() req,
  ) {
    createCommentDto.userId = req.user.id;
    await this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.findOne();
  }
}
