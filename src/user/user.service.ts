import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { SignUpDto } from './dto/SignUpDto';
import { LoginDto } from './dto/LoginDto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { id, nick_name, password } = signUpDto; //DTO로 부터 객체 생성에 필요한 데이터를 가져옴
    const newUser = this.userRepository.create({ id, nick_name, password });
    const user = await this.userRepository.save(newUser); //새로운 user를 생성
    return user; //User저장 후 반환 promise를 통해 메서드 완료시 사용자 객체 반환
  }

  async login(loginDto: LoginDto): Promise<User> {
    const { id, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { id } });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
