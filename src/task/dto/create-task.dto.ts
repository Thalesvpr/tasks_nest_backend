import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDto {

  /**
   * O título da tarefa é utilizado para identificar rapidamente a atividade que deve ser realizada.
   * Deve ser um resumo curto e objetivo.
   * @example Implementar funcionalidade de login
   */
  @IsString()
  @IsNotEmpty({ message: 'O título não pode estar vazio.' })
  title: string;

  /**
   * A descrição da tarefa deve detalhar todas as informações necessárias para executá-la. Pode incluir
   * passos específicos ou requisitos a serem atendidos.
   * @example Desenvolver a tela de login e configurar a autenticação
   */
  @IsString()
  @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
  description: string;

  /**
   * O status da tarefa indica o estado atual da atividade. Ele é opcional e pode ser atualizado
   * conforme o progresso da tarefa.
   * @example em andamento
   */
  @IsString()
  @IsOptional()
  status?: string;
}
