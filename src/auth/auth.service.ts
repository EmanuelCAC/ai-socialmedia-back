import { LoginDto } from "./dto/login.dto";
import { Injectable } from '@nestjs/common';
import { RegisterDto } from "./dto/register.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.shema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  ) {}
  
  public login(loginDto: LoginDto) {
    return {
      message: "Login successful",
      user: loginDto,
    };
  }

  public async register(registerDto: RegisterDto) {
    try {
      const userExists = await this.userModel.findOne({ email: registerDto.email });

      if (userExists) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      registerDto.password = hashedPassword;

      const newUser = new this.userModel(registerDto);
      return await newUser.save();
    } catch (error) {
      throw new Error("Error during registration");
    }
  }
}