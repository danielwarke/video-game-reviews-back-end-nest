import { IsInt, IsNotEmpty, Max, Min, MinLength } from 'class-validator';

export class CreateUpdateReviewDto {
  @IsNotEmpty()
  userId: string;

  @MinLength(5)
  title: string;

  @MinLength(5)
  body: string;

  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;
}
