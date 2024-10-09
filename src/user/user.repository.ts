import { DefaultRepository } from "src/shared/database/repository/default.repository";
import { User } from "./entities/user.entity";
import { DataSource, FindOneOptions } from "typeorm";

export class UserRepository extends DefaultRepository<User> {

    constructor(dataSource: DataSource) {
        super(User, dataSource);
    }

    findByEmail(email: string): Promise<User> {
        return this.repository.findOne({ where: { email } } as FindOneOptions<User>);
    }

}