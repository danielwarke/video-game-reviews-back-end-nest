import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schemas/user.schema';
import mongoose, { Document } from 'mongoose';
import { VideoGame } from '../../video-games/schemas/video-game.schema';
import { Comment } from '../../comments/schemas/comment.schema';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VideoGame',
    required: true,
  })
  videoGame: VideoGame;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
