import { IsString, IsNotEmpty, IsEmail, Matches } from 'class-validator';

export class CreateUserDto {
  
  /**
   * O nome do usuário será utilizado para identificação na aplicação, como em perfis e mensagens.
   * Deve ser um nome que represente bem o usuário.
   * @example João Silva
   */
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  name: string;

  /**
   * O e-mail é necessário para registrar o usuário. Ele será utilizado para login e comunicações importantes.
   * Deve ser um endereço de e-mail válido e único na base de dados.
   * @example joao.silva@exemplo.com
   */
  @IsEmail({}, { message: 'Por favor, insira um e-mail válido.' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  email: string;

  /**
   * A senha é obrigatória para o registro e deve seguir requisitos mínimos de segurança.
   * Deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.
   * @example Senha123!
   */
  @IsString()
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: 'A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.' }
  )
  password: string;
}
