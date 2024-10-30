import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async findUser(userName: string) {
    return await this.userModel
      .find({
        username: userName,
      })
      .exec();
  }

  async checkExistUser(userName: string, email: string) {
    const existUser = await this.userModel.findOne({
      username: userName,
      email: email,
    });
    if (existUser) return true;
    else return false;
  }
}
