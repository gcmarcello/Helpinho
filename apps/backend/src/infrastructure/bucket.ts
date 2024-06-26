import {
  GetObjectCommand,
  GetObjectRequest,
  PutObjectCommand,
  PutObjectRequest,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import "dotenv/config";

const devClient = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});

const prodClient = new S3Client({
  region: process.env.AWS_REGION!,
});

export class Bucket {
  private client: S3Client;

  constructor() {
    this.client =
      process.env.NODE_ENV === "production" ? prodClient : devClient;
  }

  public async getObject(params: GetObjectRequest) {
    return await this.client.send(new GetObjectCommand(params));
  }

  public async getSignedUrl(params: PutObjectRequest) {
    return await getSignedUrl(this.client, new PutObjectCommand(params), {
      expiresIn: 3600,
    });
  }
}
