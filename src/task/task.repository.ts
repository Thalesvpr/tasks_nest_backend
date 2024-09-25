import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Task } from './entities/task.entity';
import { DefaultRepository } from 'src/shared/database/repository/default.repository';
@Injectable()
export class TaskRepository extends DefaultRepository<Task> {
  constructor(dataSource: DataSource) {
    super(Task, dataSource);
  }

  async findByUserId(userId: string): Promise<Task[]> {
      const tasks = await this.repository.find({
        where: { user: { id: userId } },
      });
      return tasks;
  }
}
