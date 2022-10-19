import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUpdateVideoGameDto {
  @IsNotEmpty()
  userId: string;

  @MinLength(5)
  title: string;

  description: string;

  @MinLength(10)
  imageUrl: string;
}
