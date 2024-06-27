import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { HelpinhoService } from "./helpinho.service";
import {
  ListHelpinhoQuery,
  ServerCreateHelpinhoDto,
  UserSession,
} from "shared-types";
import { AuthGuard } from "../auth/auth.guard";

@Controller("helpinho")
export class HelpinhoController {
  constructor(private helpinhoService: HelpinhoService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() data: ServerCreateHelpinhoDto,
    @Request() req: { user: UserSession }
  ) {
    return this.helpinhoService.createHelpinho({
      ...data,
      userId: req.user.id,
    });
  }

  @UseGuards(AuthGuard)
  @Get("own")
  getOwnInfo(@Request() req: { user: UserSession }) {
    return this.helpinhoService.getUserHelpinhos(req.user.id);
  }

  @Get()
  getAllInfo(@Query() query: ListHelpinhoQuery) {
    return this.helpinhoService.getHelpinhos(query);
  }

  @Get(":id")
  getHelpinhoFromId(@Param("id") id: string) {
    return this.helpinhoService.getHelpinhoFromId(id);
  }
}
