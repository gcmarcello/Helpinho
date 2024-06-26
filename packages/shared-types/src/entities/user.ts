import * as dynamoose from "dynamoose";
import { Item } from "dynamoose/dist/Item";

export interface User extends Item {
  id: string;
  password: string;
  email: string;
  name: string;
  phone: string;
}

export const UserModel = dynamoose.model<User>("users", {
  id: String,
  name: String,
  email: String,
  phone: String,
  password: String,
});
