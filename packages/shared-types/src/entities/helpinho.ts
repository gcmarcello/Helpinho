import * as dynamoose from "dynamoose";
import { Item } from "dynamoose/dist/Item";

export interface Helpinho extends Item {
  id: string;
  userId: string;
  category: string;
  deadline: string;
  description: string;
  goal: string;
  image: string;
  title: string;
}

export const HelpinhoModel = dynamoose.model<Helpinho>("helpinho", {
  id: String,
  userId: String,
  category: String,
  deadline: String,
  description: String,
  goal: String,
  image: String,
  title: String,
});
