import { Body, Controller, Post } from "@nestjs/common";
import { FilesService } from "./files.service";
import { GetUploadLinkDto } from "shared-types";

@Controller("files")
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post("presigned/")
  getPresignedUrl(@Body() body: GetUploadLinkDto) {
    return this.filesService.createUploadLink(body);
  }
}
