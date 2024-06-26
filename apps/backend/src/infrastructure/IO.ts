import { HttpStatus } from "@nestjs/common";

export class ServerResponse {
  public static success<T>({
    message,
    data,
    headers,
  }: {
    message?: string;
    data?: T;
    headers?: Record<string, string>;
  }) {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        ...headers,
      },
      statusCode: 200,
      body: JSON.stringify({
        message: message ?? "OK",
        data: data,
      }),
    };
  }

  public static error({
    type,
    message,
    error,
  }: {
    type?: keyof typeof HttpStatus;
    message?: string;
    error?: any;
  }) {
    return {
      statusCode: type ? HttpStatus[type] : HttpStatus.BAD_REQUEST,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        error: error,
        message: message ?? error.message ?? "Ocorreu um erro inesperado.",
        fields: error.fields ? error.fields : undefined,
      }),
    };
  }
}
