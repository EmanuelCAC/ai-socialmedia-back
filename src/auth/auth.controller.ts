import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

  // fazer conexão com o banco de dados e fazer a validação do usuário
  // fazer a validação do usuário com o banco de dados e retornar o token JWT

@Controller("/auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post("/login")
  public async login(@Body() loginDto: LoginDto) {
    try {
      await this.authService.login(loginDto);

      return {
        status: HttpStatus.OK,
        message: "User logged in successfully",
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