import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ServiceResult } from 'src/shared/results/service.result';
import { NewEntity } from 'src/shared/entities/default.entity';
import { NotFoundRepositoryError, BadRequestRepositoryError } from 'src/shared/exceptions/repository.exceptions';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getAllTasks(): Promise<ServiceResult<Task[]>> {
    const allTasks = await this.taskRepository.selectAll();
    if (!allTasks || allTasks.length === 0) {
      return ServiceResult.failure(new NotFoundRepositoryError('No tasks found'));
    }
    return ServiceResult.success(allTasks);
  }

  async getTaskById(id: string): Promise<ServiceResult<Task>> {
    const task = await this.taskRepository.selectOne(id);
    if (!task) {
      return ServiceResult.failure(new NotFoundRepositoryError('Task not found'));
    }
    return ServiceResult.success(task);
  }

  async createTask(data: NewEntity<Task>): Promise<ServiceResult<Task>> {
    const newTask = new Task(data);
    const task = await this.taskRepository.insertOne(newTask);
    if (!task) {
      return ServiceResult.failure(new BadRequestRepositoryError('Error creating task'));
    }
    return ServiceResult.success(task);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<ServiceResult<Task>> {
    const updateResult = await this.taskRepository.updateOne(id, updateTaskDto);
    if (!updateResult) {
      return ServiceResult.failure(new NotFoundRepositoryError('Task not found'));
    }
    return ServiceResult.success(updateResult);
  }

  async deleteTask(id: string): Promise<ServiceResult<void>> {
    const deleteResult = await this.taskRepository.deleteOne(id);
    return ServiceResult.success(undefined); // Retorna sucesso sem dados
  }

  async getTasksByUserId(userId: string): Promise<ServiceResult<Task[]>> {
    const tasksByUser = await this.taskRepository.findByUserId(userId);
    if (!tasksByUser || tasksByUser.length === 0) {
      return ServiceResult.failure(new NotFoundRepositoryError('No tasks found for this user'));
    }
    return ServiceResult.success(tasksByUser);
  }
}
