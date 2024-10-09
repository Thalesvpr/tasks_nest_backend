import { randomUUID } from 'crypto';
import { CreateDateColumn, UpdateDateColumn, PrimaryColumn, BeforeInsert } from 'typeorm';

export abstract class DefaultEntity<T> {

    constructor(data?: Partial<T>) {
        if (data) {
            Object.assign(this, data);
            this.id = this.id || randomUUID();
        }
    }
    @BeforeInsert()
    beforeInsert() {
        this.createdAt = this.createdAt;
        this.updatedAt = new Date();
    }
    @PrimaryColumn({ type: 'uuid' })
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export type NewEntity<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

export type UpdateEntity<T> = Partial<NewEntity<T>>