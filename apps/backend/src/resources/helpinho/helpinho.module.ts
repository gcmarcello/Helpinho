import { Module } from "@nestjs/common";
import { HelpinhoController } from "./helpinho.controller";
import { HelpinhoService } from "./helpinho.service";

@Module({
  controllers: [HelpinhoController],
  providers: [HelpinhoService],
})
export class HelpinhoModule {}
