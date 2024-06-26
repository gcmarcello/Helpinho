import * as dynamoose from "dynamoose";
import { Item } from "dynamoose/dist/Item";

export interface Help extends Item {
  amount: string;
  helpinhoId: string;
  userId: string;
}

export const HelpModel = dynamoose.model<Help>("help", {
  amount: String,
  helpinhoId: String,
  userId: String,
});
