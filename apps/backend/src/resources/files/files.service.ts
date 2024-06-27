import { Injectable } from "@nestjs/common";
import { GetUploadLinkDto } from "shared-types";
import { Bucket } from "src/infrastructure/bucket";

@Injectable()
export class FilesService {
  constructor(private bucket: Bucket) {
    this.bucket = new Bucket();
  }

  async createUploadLink(data: GetUploadLinkDto) {
    const bucketName = process.env.S3_BUCKET_NAME;

    const url = await this.bucket.getSignedUrl({
      Bucket: bucketName,
      Key: crypto.randomUUID() + "." + data.mimeType.split("/")[1],
      ContentType: String(data.mimeType),
      ACL: "public-read",
    });

    return { url };
  }
}
