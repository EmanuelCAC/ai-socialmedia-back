import { LoginDto } from "./dto/login.dto";
import { Injectable } from '@nestjs/common';
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor() {}
  
  public login(loginDto: LoginDto) {
    return {
      message: "Login successful",
      user: loginDto,
    };
  }

  public register(loginDto: RegisterDto) {
   
  }
}