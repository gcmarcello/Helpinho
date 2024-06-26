import { IsNumber, IsString } from "class-validator";

export const mimeType = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg",
  "image/webp",
] as const;

export type MimeType = (typeof mimeType)[number];

export class GetUploadLinkDto {
  @IsString()
  mimeType: MimeType;

  @IsNumber()
  size: number;
}
