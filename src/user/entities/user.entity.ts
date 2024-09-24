import { DefaultEntity } from "shared/database/entities/default.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, OneToMany } from "typeorm";

export class User extends DefaultEntity<User> {

    constructor(data?: Partial<User>) {
        super(data);
    }

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;


    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];

}
