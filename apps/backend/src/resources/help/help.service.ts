import { marshall } from "@aws-sdk/util-dynamodb";
import { Injectable } from "@nestjs/common";
import { CreateHelpDto, Help } from "shared-types";
import { dynamo, helpsTable } from "src/infrastructure/database";
import { FormError } from "src/infrastructure/errors/form-error";

@Injectable()
export class HelpService {
  async createHelp(payload: CreateHelpDto & { userId: string }) {
    if (+payload.amount < 0)
      throw new FormError("Amount must be greater than 0", ["amount"]);

    const newHelp: Help = {
      id: crypto.randomUUID(),
      amount: payload.amount,
      helpinhoId: payload.helpinhoId,
      userId: payload.userId,
    };

    await dynamo().putItem({
      TableName: helpsTable,
      Item: marshall(newHelp),
    });

    return newHelp;
  }
}
