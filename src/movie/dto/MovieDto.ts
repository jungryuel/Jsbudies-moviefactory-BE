import { IsNotEmpty } from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  movie_id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  open_date: Date;

  @IsNotEmpty()
  close_date: Date;

  @IsNotEmpty()
  audi_acc: number;

  @IsNotEmpty()
  image_url: string;

  @IsNotEmpty()
  theme: string;
}
