import { LoginDto } from "./dto/login.dto";
import { Injectable } from '@nestjs/common';
import { RegisterDto } from "./dto/register.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.shema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';

dotenv.config();


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  ) {}
  
  public async login(loginDto: LoginDto) {
    try {
      const user: any = await this.userModel.findOne({ email: loginDto.email });

      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = bcrypt.compareSync(loginDto.password, user.password);

      if (!isPasswordValid) {
        throw new Error("User not found");
      }

      console.log("Generate token: " + process.env.SECRET_KEY)

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY || "", { expiresIn: '30m' });

      return token

    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
   
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
      throw new Error(error.message);
    }
  }
}