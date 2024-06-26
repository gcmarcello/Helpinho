// services/user.service.ts
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserModel, SignupDto } from "shared-types";

@Injectable()
export class UserService {
  async findUserByEmail(email: string) {
    const users = await UserModel.query("email").eq(email).exec();

    if (!users || users.length === 0) return null;

    return users[0];
  }

  async findUserById(id: string) {
    const user = await UserModel.get(id, {
      attributes: ["email", "name", "phone", "userId"],
    });

    return user;
  }

  async createUser(data: SignupDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = new UserModel({
      id: crypto.randomUUID(),
      email: data.email,
      name: data.name,
      password: hashedPassword,
      phone: data.phone,
    });

    await newUser.save();

    return newUser;
  }
}
