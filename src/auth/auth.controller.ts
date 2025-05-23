import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Controller("/auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post("/login")
  public async login(@Body() loginDto: LoginDto) {
    try {
      const token = await this.authService.login(loginDto);

      return {
        status: HttpStatus.OK,
        message: "User logged in successfully",
        token: token,
      };
    } catch (error) {
      if (error.message.includes("User not found")) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          message: "Invalid email or password",
        };
      }
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Error during login",
      };
    }
  }

  @Post("/register")
  public async register(@Body() registerDto: RegisterDto) {
    try {
      await this.authService.register(registerDto);
      return {
        status: HttpStatus.CREATED,
        message: "User registered successfully",
      };
    } catch (error) {
      console.error(error)
      if (error.message.includes("User already exists")) {
        return {
          status: HttpStatus.CONFLICT,
          message: "User already exists",
        }
      }
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Error during registration",
      }
    }
  }
}