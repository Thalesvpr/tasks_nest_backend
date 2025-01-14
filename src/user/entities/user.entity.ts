import { DefaultEntity } from "../../shared/entities/default.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class User extends DefaultEntity<User> {
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];
}
