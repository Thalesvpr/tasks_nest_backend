import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class LoginPayloadDto {

    /**
     * O e-mail é necessário para efetuar o login. Deve ser um e-mail válido que tenha sido registrado previamente.
     * @example usuario@exemplo.com
     */
    @IsString()
    @IsNotEmpty({ message: 'O email não pode estar vazio.' })
    email: string;

    /**
     * A senha é obrigatória para o login e deve seguir requisitos mínimos de segurança, como comprimento e complexidade.
     * Deve conter pelo menos 8 caracteres, com uma letra maiúscula, uma letra minúscula, um número e um caractere especial.
     * @example 123@Abc!
     */
    @IsString()
    @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
    @Matches(
        createPasswordRegex(),
        { message: 'A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.' }
    )
    password: string;
}

/**
 * Cria uma expressão regular para validar a complexidade da senha.
 * Requisitos:
 * - Pelo menos uma letra minúscula
 * - Pelo menos uma letra maiúscula
 * - Pelo menos um número
 * - Pelo menos um caractere especial
 * - Mínimo de 8 caracteres no total
 */
function createPasswordRegex(): RegExp {
    const lowerCase = '(?=.*[a-z])';
    const upperCase = '(?=.*[A-Z])';
    const digit = '(?=.*\\d)';
    const specialChar = '(?=.*[!@#$%^&*()_+\\-={}|[\\]:";\'<>?,./~`])';
    const minLength = '[A-Za-z\\d!@#$%^&*()_+\\-={}|[\\]:";\'<>?,./~`]{8,}';

    const regex = `^${lowerCase}${upperCase}${digit}${specialChar}${minLength}$`;
    return new RegExp(regex);
}
