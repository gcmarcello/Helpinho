import { User } from "./user";

export interface Help {
  id: string;
  amount: string;
  helpinhoId: string;
  userId: string;
  user?: User;
}
