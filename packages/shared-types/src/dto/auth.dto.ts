import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsStrongPassword,
  Min,
  MinLength,
} from "class-validator";

export class SignupDto {
  @IsString()
  @MinLength(3, { message: "Nome deve ter no mínimo 3 caracteres" })
  name: string;

  @IsEmail({}, { message: "Email inválido" })
  email: string;

  @IsString()
  @IsStrongPassword(
    {},
    {
      message:
        "Senha deve conter 8 caracteres, uma letra maiúscula, minúscula, um número e um caractere especial.",
    }
  )
  password: string;

  @IsNumberString({}, { message: "Telefone inválido" })
  phone: string;
}

export class LoginDto {
  @IsEmail({}, { message: "Email inválido" })
  email: string;

  @IsString()
  @IsNotEmpty({ message: "Senha não pode ser vazia" })
  password: string;

  @IsBoolean()
  remember: boolean;
}
