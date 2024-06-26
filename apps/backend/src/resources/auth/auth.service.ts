/* eslint-disable @typescript-eslint/no-unused-vars */
// services/auth.service.ts
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as jose from "jose";
import { UserSession, LoginDto, SignupDto } from "shared-types";
import { UserService } from "../users/users.service";
import { FormError } from "../../infrastructure/errors/form-error";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(data: LoginDto) {
    const user = await this.userService.findUserByEmail(data.email);

    if (!user) throw new FormError("Usuário não encontrado", ["email"]);

    const hashCompare = await bcrypt.compare(data.password, user.password);

    if (!hashCompare) throw new FormError("Senha inválida", ["password"]);

    const { password, phone, email, ...userData } = user;

    return {
      name: user.name,
      email: user.email,
      token: await this.createToken(userData),
    };
  }

  async register(data: SignupDto) {
    const user = await this.userService.findUserByEmail(data.email);

    if (user)
      throw new FormError("Email já utilizado por outro usuário", ["email"]);

    const createdUser = await this.userService.createUser(data);

    const { password, phone, email, ...userData } = createdUser;

    return {
      name: createdUser.name,
      email: createdUser.email,
      token: await this.createToken(userData),
    };
  }

  async createToken(payload: { id: string; name: string; remember?: boolean }) {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not defined");

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    return new jose.SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("auth")
      .setAudience("api")
      .setExpirationTime(payload?.remember ? "30d" : "1d")
      .sign(secret);
  }
}
