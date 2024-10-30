import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto, SignInDto } from 'src/dtos/user-dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(user: UserDto) {
    const existUser = await this.userService.checkExistUser(user);
    if (existUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const hashedPass = await bcrypt.hash(user.password, 10);
    const userData: User = {
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      number: user.number,
      password: hashedPass,
      address: user.address,
      role: 'user',
      createdAt: Date.now(),
    };
    await this.userService.createUser(userData);
    delete userData.password;
    return userData;
  }
  async signIn(data: SignInDto) {
    const user: any = await this.userService.findUser(data.username);

    if (!user) {
      throw new HttpException('User Is Not Exist', HttpStatus.BAD_REQUEST);
    }
    const comparedpassword = await bcrypt.compare(data.password, user.password);
    if (!comparedpassword) {
      throw new HttpException(
        'password Is Not correct',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
