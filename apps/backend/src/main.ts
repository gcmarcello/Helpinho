import { NestFactory } from "@nestjs/core";
import serverlessExpress from "@codegenie/serverless-express";
import { Callback, Context, Handler } from "aws-lambda";
import { AppModule } from "./app.module";
import * as dynamoose from "dynamoose";

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);

  const ddb = new dynamoose.aws.ddb.DynamoDB({
    region: "us-east-1",
  });

  dynamoose.aws.ddb.set(ddb);

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
