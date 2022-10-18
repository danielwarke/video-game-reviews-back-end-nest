import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';
import { Review } from './review.schema';

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true })
  body: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  creator: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Review', required: true })
  review: Review;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
