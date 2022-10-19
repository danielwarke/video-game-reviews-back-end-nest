import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUpdateReviewDto } from './dto/create-update-review.dto';
import { Review } from './schemas/review.schema';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createReviewDto: CreateUpdateReviewDto, @Request() req) {
    createReviewDto.userId = req.user.id;
    await this.reviewsService.create(createReviewDto);
  }

  @Get()
  findAll(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: CreateUpdateReviewDto,
    @Request() req,
  ) {
    updateReviewDto.userId = req.user.id;
    return this.reviewsService.update(id, updateReviewDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.reviewsService.delete(id);
  }
}
