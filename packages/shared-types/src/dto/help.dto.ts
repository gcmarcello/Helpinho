import { IsString, IsUUID } from "class-validator";

export class CreateHelpDto {
  @IsString()
  amount: string;

  @IsUUID()
  helpinhoId: string;
}
