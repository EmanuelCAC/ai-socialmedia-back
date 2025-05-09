import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

  // fazer conexão com o banco de dados e fazer a validação do usuário
  // fazer a validação do usuário com o banco de dados e retornar o token JWT

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  public login(@Body() loginDto: LoginDto) {
     return this.authService.login(loginDto);
  }

  @Post("/register")
  public register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}