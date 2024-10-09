import { IsString, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  
  /**
   * O título da tarefa pode ser atualizado para refletir melhor a atividade em curso.
   * @example Refatorar componente de autenticação
   */
  @IsString()
  @IsOptional()
  title?: string;

  /**
   * A descrição detalhada da tarefa pode ser atualizada conforme novos requisitos ou mudanças no escopo.
   * @example Melhorar a lógica de validação de credenciais do usuário
   */
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * O status da tarefa pode ser atualizado para indicar o progresso atual (por exemplo, 'em andamento', 'concluído').
   * @example concluído
   */
  @IsString()
  @IsOptional()
  status?: string;
}
