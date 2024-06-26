import {
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import "dotenv/config";

const devClient = new DynamoDB({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});

const prodClient = new DynamoDB({
  region: process.env.AWS_REGION!,
});

const client = process.env.NODE_ENV === "production" ? prodClient : devClient;

export const dynamo = () => {
  async function putItem(params: PutItemCommand["input"]) {
    const result = await client.send(new PutItemCommand(params));
    return result;
  }

  async function getItem(params: GetItemCommand["input"]) {
    const item = (await client.send(new GetItemCommand(params))).Item;

    if (!item) {
      return null;
    }

    return unmarshall(item);
  }

  async function query(params: QueryCommand["input"]) {
    const items = (await client.send(new QueryCommand(params))).Items;

    if (!items) {
      return [];
    }

    return items.map((i) => unmarshall(i));
  }

  async function scan(params: ScanCommand["input"]) {
    const items = (await client.send(new ScanCommand(params))).Items;

    if (!items) {
      return [];
    }

    return items.map((i) => unmarshall(i));
  }

  return {
    putItem,
    getItem,
    query,
    scan,
  };
};
