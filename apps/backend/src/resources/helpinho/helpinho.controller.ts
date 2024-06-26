import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { HelpinhoService } from "./helpinho.service";
import { ServerCreateHelpinhoDto, UserSession } from "shared-types";
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
  @Get()
  getOwnInfo(@Request() req: { user: UserSession }) {
    console.log(req.user.id);
    return this.helpinhoService.getUserHelpinhos(req.user.id);
  }

  @Get("all")
  getAllInfo() {
    return this.helpinhoService.getHelpinhos();
  }
}
