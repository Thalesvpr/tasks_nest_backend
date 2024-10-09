import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Task } from './entities/task.entity';
import { NewEntity, UpdateEntity } from 'src/shared/entities/default.entity';
import { NotFoundRepositoryError, BadRequestRepositoryError } from 'src/shared/exceptions/repository.exceptions';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getAllTasks(): Promise<Task[]> {
    const allTasks = await this.taskRepository.selectAll();
    if (!allTasks || allTasks.length === 0) {
      throw new NotFoundRepositoryError('No tasks found');
    }
    return allTasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.selectOne(id);
    if (!task) {
      throw new NotFoundRepositoryError('Task not found');
    }
    return task;
  }

  async createTask(data: NewEntity<Task>, userId: string): Promise<Task> {
    const newTask = new Task(data);
    const task = await this.taskRepository.insertOne(newTask);
    if (!task) {
      throw new BadRequestRepositoryError('Error creating task');
    }
    return task;
  }

  async updateTask(id: string, data: UpdateEntity<Task>, userId: string): Promise<Task> {
    const task = await this.taskRepository.selectOne(id)

    if(task.user.id == userId){
      throw new BadRequestRepositoryError('You cannot update a task that you did not create')
    }

    const updateResult = await this.taskRepository.updateOne(id, data);
    if (!updateResult) {
      throw new NotFoundRepositoryError('Task not found');
    }
    return updateResult;
  }

  async deleteTask(id: string, userId: string): Promise<void> {
    const task = await this.taskRepository.selectOne(id)

    if(task.user.id == userId){
      throw new BadRequestRepositoryError('You cannot delete a task that you did not create')
    }
    const deleteResult = await this.taskRepository.deleteOne(id);
    if (!deleteResult.affected) {
      throw new NotFoundRepositoryError('Task not found');
    }
  }

  async getTasksByUserId(userId: string): Promise<Task[]> {
    const tasksByUser = await this.taskRepository.findByUserId(userId);
    if (!tasksByUser || tasksByUser.length === 0) {
      throw new NotFoundRepositoryError('No tasks found for this user');
    }
    return tasksByUser;
  }
}
