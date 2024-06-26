import { Help } from "./help";
import { User } from "./user";

export interface Helpinho {
  id: string;
  userId: string;
  categories: string[];
  deadline: string;
  description: string;
  goal: string;
  image: string;
  title: string;
  helps?: Help[];
  user?: User;
}
