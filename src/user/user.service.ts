import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { UserRepository } from './user.repository';
import { UserDto } from 'src/dtos/user-dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async createUser(user: User) {
    const createdUser = this.userRepository.createUser(user);
    return createdUser;
  }
  async findUser(username: string) {
    const user = await this.userRepository.findUser(username);
    return user[0];
  }

  async checkExistUser(user: UserDto) {
    const existUser = await this.userRepository.checkExistUser(
      user.username,
      user.email,
    );
    if (existUser) return true;
    else return false;
  }
}
