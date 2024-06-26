import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./resources/auth/auth.module";
import { HelpinhoModule } from "./resources/helpinho/helpinho.module";
import { FilesModule } from "./resources/files/files.module";

@Module({
  imports: [AuthModule, HelpinhoModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
