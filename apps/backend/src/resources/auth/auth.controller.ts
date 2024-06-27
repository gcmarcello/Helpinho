import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto, SignupDto } from "shared-types";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Post("signup")
  register(@Body() data: SignupDto) {
    return this.authService.register(data);
  }
}
