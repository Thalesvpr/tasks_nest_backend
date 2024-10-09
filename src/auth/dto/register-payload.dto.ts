import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class RegisterPayloadDto {

    @IsString()
    @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'O email não pode estar vazio.' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: 'A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.' }
    )
    password: string;
}
