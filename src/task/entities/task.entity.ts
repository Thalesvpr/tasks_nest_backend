import { DefaultEntity } from "shared/database/entities/default.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";


@Entity()
export class Task extends DefaultEntity<Task> {

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: string;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;
}
