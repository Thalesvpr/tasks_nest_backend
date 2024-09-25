import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { DefaultEntity } from '../../shared/entities/default.entity';


@Entity()
export class Task extends DefaultEntity<Task> {

    constructor(data?: Partial<Task>) {
        super(data);
    }

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: string;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;
}
