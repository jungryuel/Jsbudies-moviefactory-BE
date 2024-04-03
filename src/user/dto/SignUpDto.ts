import { IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  nick_name: string;

  @IsNotEmpty()
  password: string;
}
