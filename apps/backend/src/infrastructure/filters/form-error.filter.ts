import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { FormError } from "../errors/form-error";
import { Response } from "express";

@Catch(FormError)
export class FormErrorFilter implements ExceptionFilter {
  catch(exception: FormError<any>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(exception.getStatus()).json(JSON.parse(exception.message));
  }
}
