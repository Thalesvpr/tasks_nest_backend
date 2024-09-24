import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty({ message: 'O título não pode estar vazio.' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
    description: string;

    @IsString()
    @IsOptional()
    status?: string;
}
