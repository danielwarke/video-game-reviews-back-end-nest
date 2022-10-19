import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schemas/user.schema';
import mongoose, { Document } from 'mongoose';
import { Review } from '../../reviews/schemas/review.schema';

export type VideoGameDocument = VideoGame & Document;

@Schema({ timestamps: true })
export class VideoGame {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  reviews: Review[];
}

export const VideoGameSchema = SchemaFactory.createForClass(VideoGame);
