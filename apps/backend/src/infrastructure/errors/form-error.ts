import { HttpException } from "@nestjs/common";

export class FormError<T> extends HttpException {
  constructor(message: string, fields: Array<keyof T>) {
    super(JSON.stringify({ message, fields }), 400);
  }
}
