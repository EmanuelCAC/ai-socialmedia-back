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
  
  public async login(loginDto: LoginDto) {

    // verify user email
    // verify user password
    // if user is not found, throw error
    // if password is incorrect, throw error

    // if user is found and password is correct, return jwt token


    try {
      const user: any = await this.userModel.findOne({ email: loginDto.email });

      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = bcrypt.compareSync(loginDto.password, user.password);

      if (!isPasswordValid) {
        throw new Error("User not found");
      }

      // Generate JWT token here
      // const token = this.jwtService.sign({ id: user._id });
      // return { token };

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