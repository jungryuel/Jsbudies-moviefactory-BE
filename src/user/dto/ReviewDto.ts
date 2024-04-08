import { IsNotEmpty } from 'class-validator';

export class ReviewDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  star: number;
}
