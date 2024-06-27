import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { HelpService } from "./help.service";
import { CreateHelpDto, UserSession } from "shared-types";
import { AuthGuard } from "../auth/auth.guard";

@Controller("help")
export class HelpController {
  constructor(private helpService: HelpService) {}

  @UseGuards(AuthGuard)
  @Post()
  createHelp(
    @Body() data: CreateHelpDto,
    @Request() req: { user: UserSession }
  ) {
    return this.helpService.createHelp({
      ...data,
      userId: req.user.id,
    });
  }
}
