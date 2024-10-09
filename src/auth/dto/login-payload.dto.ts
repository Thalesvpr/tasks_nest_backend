import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class LoginPayloadDto {

    @IsString()
    @IsNotEmpty({ message: 'O email não pode estar vazio.' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
    @Matches(
        createPasswordRegex(),
        { message: 'A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.' }
    )
    password: string;
}
function createPasswordRegex(): RegExp {
    // Requisitos da senha
    const lowerCase = '(?=.*[a-z])'; // Pelo menos uma letra minúscula
    const upperCase = '(?=.*[A-Z])'; // Pelo menos uma letra maiúscula
    const digit = '(?=.*\\d)'; // Pelo menos um número
    const specialChar = '(?=.*[!@#$%^&*()_+\\-={}|[\]:";\'<>?,./~`])'; // Pelo menos um caractere especial
    const minLength = '[A-Za-z\\d!@#$%^&*()_+\\-={}|[\]:";\'<>?,./~`]{8,}'; // Pelo menos 8 caracteres no total

    // Junta todos os requisitos
    const regex = `^${lowerCase}${upperCase}${digit}${specialChar}${minLength}$`;
    return new RegExp(regex);
}
