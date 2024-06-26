// services/helpinho.service.ts
import { Injectable } from "@nestjs/common";
import { Helpinho, ServerCreateHelpinhoDto } from "shared-types";
import { dynamo } from "src/infrastructure/database";

@Injectable()
export class HelpinhoService {
  async createHelpinho(data: ServerCreateHelpinhoDto & { userId: string }) {
    const newHelpinho: Helpinho = {
      id: crypto.randomUUID(),
      userId: data.userId,
      categories: data.categories,
      title: data.title,
      description: data.description,
      goal: String(data.goal),
      deadline: data?.deadline || "",
      image: data?.image || "",
    };

    dynamo().putItem({
      TableName: "helpinhos",
      Item: {
        id: { S: newHelpinho.id },
        userId: { S: newHelpinho.userId },
        categories: { L: newHelpinho.categories.map((c) => ({ S: c })) },
        title: { S: newHelpinho.title },
        description: { S: newHelpinho.description },
        goal: { S: newHelpinho.goal },
        deadline: { S: newHelpinho.deadline },
        image: { S: newHelpinho.image },
      },
    });

    return newHelpinho;
  }

  async getUserHelpinhos(userId: string) {
    const helpinhos = await dynamo().query({
      TableName: "helpinhos",
      IndexName: "UserIdIndex",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": { S: userId },
      },
    });

    const helps = await dynamo().query({
      TableName: "helps",
      IndexName: "UserIdIndex",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": { S: userId },
      },
    });

    return { helpinhos, helps };
  }

  async getHelpinhoFromId(id: string) {
    const helpinho = await dynamo().getItem({
      TableName: "helpinhos",
      Key: {
        id: { S: id },
      },
    });
    return helpinho;
  }

  async getHelpinhos() {
    const helpinhos = await dynamo().scan({
      TableName: "helpinhos",
      Limit: 10,
    });
    return helpinhos;
  }
}
