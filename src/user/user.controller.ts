import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { SignUpDto } from './dto/SignUpDto';
import { LoginDto } from './dto/LoginDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() signUpDto: SignUpDto): Promise<User> {
    return await this.userService.signUp(signUpDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<User> {
    const user = await this.userService.login(loginDto);
    if (!user) {
      throw new BadRequestException(
        '로그인 실패(잘못된 아이디 또는 비밀번호입니다)',
      );
    }

    return user; // 성공 시 사용자 객체 반환
  }
}
