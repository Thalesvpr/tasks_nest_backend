import { IsString, IsOptional, IsEmail, Matches } from 'class-validator';

export class UpdateUserDto {
  
  /**
   * O nome do usuário pode ser atualizado para refletir uma nova identificação ou apelido.
   * @example João Silva Jr.
   */
  @IsString()
  @IsOptional()
  name?: string;

  /**
   * O e-mail pode ser atualizado, caso o usuário queira mudar seu endereço de e-mail cadastrado.
   * Deve ser um endereço de e-mail válido e único na base de dados.
   * @example joao.silva@novoexemplo.com
   */
  @IsEmail({}, { message: 'Por favor, insira um e-mail válido.' })
  @IsOptional()
  email?: string;

  /**
   * A senha pode ser atualizada para melhorar a segurança da conta do usuário.
   * Deve seguir requisitos mínimos de segurança, como comprimento e complexidade.
   * @example NovaSenha@123
   */
  @IsString()
  @IsOptional()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: 'A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.' }
  )
  password?: string;
}
