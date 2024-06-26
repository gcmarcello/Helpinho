import { Module } from "@nestjs/common";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";
import { Bucket } from "src/infrastructure/bucket";

@Module({
  controllers: [FilesController],
  providers: [FilesService, Bucket],
})
export class FilesModule {}
