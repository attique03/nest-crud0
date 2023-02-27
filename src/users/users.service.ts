import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import generateToken from 'src/utils/generateToken';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  // @Login User
  async login(user: User): Promise<{ user: User; token: string }> {
    const { email, password } = user;
    const userExists = await this.userModel.findOne({ email });

    if (userExists && (await bcrypt.compare(password, userExists.password))) {
      const token = generateToken(String(userExists._id));
      return { user: userExists, token };
    }
  }

  // @Register User
  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  // async login(id: string): Promise<User> {
  //   return await this.userModel.findOne({ _id: id });
  // }
}
