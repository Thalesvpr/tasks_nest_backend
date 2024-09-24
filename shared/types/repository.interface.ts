export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T | null>;
    create(entity: T): Promise<T>;
    update(id: number, entity: T): Promise<T>;
    remove(id: number): Promise<void>;
  }