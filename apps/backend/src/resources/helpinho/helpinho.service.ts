import { Injectable } from "@nestjs/common";
import {
  Helpinho,
  ListHelpinhoQuery,
  ServerCreateHelpinhoDto,
} from "shared-types";
import {
  dynamo,
  helpinhosTable,
  helpsTable,
  usersTable,
} from "src/infrastructure/database";

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
      TableName: helpinhosTable,
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
      TableName: helpinhosTable,
      IndexName: "UserIdIndex",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": { S: userId },
      },
    });

    const helps = await dynamo().query({
      TableName: helpsTable,
      IndexName: "UserIdIndex",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": { S: userId },
      },
    });

    const helpinhosWithHelps = helpinhos.map((helpinho) => {
      const helpinhoHelps = helps.filter(
        (help) => help.helpinhoId === helpinho.id
      );
      return {
        ...helpinho,
        helps: helpinhoHelps,
      };
    });

    return helpinhosWithHelps;
  }

  async getHelpinhoFromId(id: string) {
    const helpinho = await dynamo().getItem({
      TableName: helpinhosTable,
      Key: {
        id: { S: id },
      },
    });

    if (!helpinho) return null;

    const helps = await dynamo().query({
      TableName: helpsTable,
      IndexName: "HelpinhoIdIndex",
      KeyConditionExpression: "helpinhoId = :id",
      ExpressionAttributeValues: {
        ":id": {
          S: id,
        },
      },
    });

    const user = await dynamo().query({
      TableName: usersTable,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": {
          S: helpinho.userId,
        },
      },
    });

    helpinho.helps = helps;

    helpinho.user = user[0];

    return helpinho;
  }

  async getHelpinhos(query: ListHelpinhoQuery) {
    const helpinhosData = await dynamo().scan({
      TableName: helpinhosTable,
      Limit: 4,
      FilterExpression:
        "contains(title, :title)" +
        (query.category ? " AND contains(categories, :category)" : ""),
      ExpressionAttributeValues: {
        ":title": {
          S: query.title ?? "",
        },
        ...(query.category && {
          ":category": {
            S: query.category ?? "",
          },
        }),
      },
      ExclusiveStartKey: query.cursor
        ? {
            id: { S: String(query.cursor) },
          }
        : undefined,
    });

    if (!helpinhosData.length) return [];

    const helps = [] as any[];

    const users = [] as any[];

    for (const helpinho of helpinhosData) {
      const helpsResult = await dynamo().query({
        TableName: helpsTable,
        IndexName: "HelpinhoIdIndex",
        KeyConditionExpression: "helpinhoId = :id",
        ExpressionAttributeValues: {
          ":id": {
            S: helpinho.id,
          },
        },
      });

      const usersResult = await dynamo().query({
        TableName: usersTable,
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
          ":id": {
            S: helpinho.userId,
          },
        },
      });

      helps.push(...helpsResult);
      users.push(...usersResult);
    }

    const helpinhosWithHelpsAndUsers = helpinhosData.map((helpinho) => {
      const helpinhoHelps = helps.filter(
        (help) => help.helpinhoId === helpinho.id
      );
      const helpinhoUser = users.find((user) => user.id === helpinho.userId);
      return {
        ...helpinho,
        helps: helpinhoHelps,
        user: helpinhoUser,
      };
    });

    return helpinhosWithHelpsAndUsers;
  }
}
