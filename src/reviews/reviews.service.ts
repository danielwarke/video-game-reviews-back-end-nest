import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';
import { Model } from 'mongoose';
import { CreateUpdateReviewDto } from './dto/create-update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(createReviewDto: CreateUpdateReviewDto): Promise<Review> {
    const createdReview = new this.reviewModel(createReviewDto);
    return createdReview.save();
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async findOne(id: string): Promise<Review> {
    return this.reviewModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateReviewDto: CreateUpdateReviewDto) {
    const review = await this.reviewModel.findById(id);
    if (!review) {
      throw new NotFoundException();
    }

    if (review.user.toString() !== updateReviewDto.userId) {
      throw new UnauthorizedException();
    }

    review.title = updateReviewDto.title;
    review.body = updateReviewDto.body;
    review.rating = updateReviewDto.rating;
    return review.save();
  }

  async delete(id: string) {
    return await this.reviewModel.findByIdAndRemove({ _id: id }).exec();
  }
}
