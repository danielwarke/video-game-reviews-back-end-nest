import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUpdateCommentDto {
  @IsNotEmpty()
  userId: string;

  @MinLength(5)
  body: string;
}