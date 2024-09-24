// src/common/repository/base.repository.ts
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IRepository } from 'shared/types/repository.interface';

@Injectable()
export abstract class BaseRepository<T> implements IRepository<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<T | null> {
    return this.repository.findOne({ where: { id } as any });
  }

  async create(entity: T): Promise<T> {
    const newEntity = this.repository.create(entity);
    return this.repository.save(newEntity);
  }

  async update(id: number, entity: T): Promise<T> {
    await this.repository.update(id, entity as any);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
