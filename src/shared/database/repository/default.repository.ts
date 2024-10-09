import { ObjectLiteral, Repository, FindOneOptions, EntityTarget, DataSource, DeepPartial, DeleteResult } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { DefaultEntity } from '../../entities/default.entity';
import { BadRequestRepositoryError, NotFoundRepositoryError } from '../../exceptions/repository.exceptions';

@Injectable()
export abstract class DefaultRepository<T extends ObjectLiteral & DefaultEntity<T>> extends Repository<T> {
  protected readonly repository: Repository<T>;

  constructor(readonly model: EntityTarget<T>, readonly dataSource: DataSource) {
    super(model, dataSource.createEntityManager());
    this.repository = this.dataSource.getRepository(model);
  }

  async selectAll(): Promise<T[]> {
    const entities = await this.repository.find();
    return entities;
  }

  async selectOne(id: string): Promise<T> {
    const entity = await this.repository.findOne({ where: { id } } as FindOneOptions<T>);
    if (!entity) {
      throw new NotFoundRepositoryError(`Entity with id ${id} not found`);
    }
    return entity;
  }

  async insertOne(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.repository.create(entity);
    const savedEntity = await this.repository.save(newEntity);
    return savedEntity;
  }

  async updateOne(id: string, entity: DeepPartial<T>): Promise<T> {
    const existingEntity = await this.selectOne(id);
    await this.repository.update(id, entity);
    return { ...existingEntity, ...entity };
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundRepositoryError(`Entity with id ${id} not found`);
    }
    return result
  }
}
