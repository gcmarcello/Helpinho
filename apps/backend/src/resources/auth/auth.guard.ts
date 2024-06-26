import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;

    const userSession = await this.authService.validateToken(token);

    if (!userSession) throw new HttpException("Forbidden", 403);

    request.user = userSession;

    return true;
  }
}
