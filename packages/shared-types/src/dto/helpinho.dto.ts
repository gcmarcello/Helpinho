import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from "class-validator";

class CreateHelpinhoDto {
  @MinLength(3, { message: "Título deve ter no mínimo 3 caracteres" })
  title: string;
  @MinLength(3, { message: "Descrição deve ter no mínimo 3 caracteres" })
  description: string;
  @IsArray()
  @ArrayMinSize(1, {
    message: "Escolha pelo menos uma categoria para o Helpinho",
  })
  categories: string[];
  @IsNumber()
  @Min(0, { message: "Meta deve ser maior que 0" })
  @Max(50000, { message: "Meta deve ser menor que 50000" })
  goal: number;
  @IsOptional()
  deadline?: string;
  @IsOptional()
  pix?: string;
}

export class ClientCreateHelpinhoDto extends CreateHelpinhoDto {
  @IsOptional()
  image: File;
}

export class ServerCreateHelpinhoDto extends CreateHelpinhoDto {
  @IsOptional()
  image: string;
}

export class GetHelpinhoDto {
  @IsString()
  id: string;
  @IsString()
  @MinLength(3, { message: "Busca deve ter no mínimo 3 caracteres" })
  title: string;
  @IsOptional()
  category: string;
}

export class ListHelpinhoQuery {
  @IsString()
  title?: string;
  @IsString()
  category?: string;
  @IsString()
  cursor?: string;
}
