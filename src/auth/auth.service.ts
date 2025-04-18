import { LoginDto } from "./dto/login.dto";
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  public login(loginDto: LoginDto) {
    return {
      message: "Login successful",
      user: loginDto,
    };
  }

  public register(loginDto: RegisterDto) {
    return {
      message: "Register successful",
      user: loginDto,
    };
  }
}