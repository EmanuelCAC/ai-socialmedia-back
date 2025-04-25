import { LoginDto } from "./dto/login.dto";
import { Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from "./dto/register.dto";
import { UserRepository } from "src/db/user/user.repository";

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: UserRepository,
  ) {}
  
  public login(loginDto: LoginDto) {
    return {
      message: "Login successful",
      user: loginDto,
    };
  }

  public register(loginDto: RegisterDto) {
    try {
      const createdUser = this.userRepository.createUser(loginDto.email, loginDto.password);
      return {
        message: "Register successful",
        user: createdUser,
      };
    } catch (error) {
      return {
        message: "Register failed",
        error: error.message,
      };
    }
  }
}