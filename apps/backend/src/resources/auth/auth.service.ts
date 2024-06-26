/* eslint-disable @typescript-eslint/no-unused-vars */
// services/auth.service.ts
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as jose from "jose";
import { LoginDto, SignupDto } from "shared-types";
import { UserService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(data: LoginDto) {
    const user = await this.userService.findUserByEmail(data.email);

    if (!user) throw new Error("Usuário não encontrado.");

    const hashCompare = await bcrypt.compare(data.password, user.password);

    if (!hashCompare)
      throw { message: "Senha inválida.", fields: ["password"] };

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
      throw {
        message: "Email já utilizado por outro usuário.",
        fields: ["email"],
      };

    const createdUser = await this.userService.createUser(data);

    const { password, phone, email, ...userData } = createdUser;

    return {
      name: createdUser.name,
      email: createdUser.email,
      token: await this.createToken(userData),
    };
  }

  async createToken(
    user: { id: string; name: string },
    remember: boolean = false
  ) {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not defined");

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    return new jose.SignJWT(user)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("auth")
      .setAudience("api")
      .setExpirationTime(remember ? "30d" : "1d")
      .sign(secret);
  }
}
