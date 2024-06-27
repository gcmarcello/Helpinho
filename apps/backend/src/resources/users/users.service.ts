// services/user.service.ts
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { SignupDto, User } from "shared-types";
import { dynamo, usersTable } from "src/infrastructure/database";

@Injectable()
export class UserService {
  async findUserByEmail(email: string) {
    const users = await dynamo().query({
      TableName: usersTable,
      IndexName: "EmailIndex",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: email },
      },
    });

    if (!users || users.length === 0) return null;

    return users[0] as User;
  }

  async findUserById(id: string) {
    const user = await dynamo().getItem({
      TableName: usersTable,
      Key: {
        id: { S: id },
      },
    });

    return user;
  }

  async createUser(data: SignupDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser: User = {
      id: crypto.randomUUID(),
      email: data.email,
      name: data.name,
      password: hashedPassword,
      phone: data.phone,
    };

    await dynamo().putItem({
      TableName: usersTable,
      Item: {
        id: { S: newUser.id },
        email: { S: newUser.email },
        name: { S: newUser.name },
        password: { S: newUser.password },
        phone: { S: newUser.phone },
      },
    });

    return newUser;
  }
}
