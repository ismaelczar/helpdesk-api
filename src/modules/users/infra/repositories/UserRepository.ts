import { inject, injectable } from "tsyringe";
import type { DataSource, Repository } from "typeorm";
import type { CreateUserDTO } from "../../domain/dto/CreateUserDTO";
import { User } from "../../domain/entities/User";
import type { IUsersRepository } from "../../domain/repositories/IUserRepository";

@injectable()
export class UsersRepository implements IUsersRepository {
    ormRepo: Repository<User>;

    constructor(@inject("DataSource") dataSource: DataSource) {
        this.ormRepo = dataSource.getRepository(User);
    }

    async createUser(data: CreateUserDTO): Promise<User> {
        const { name, password, email } = data;

        const user = this.ormRepo.create({ name, password, email });

        await this.ormRepo.save(user);

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.ormRepo.findOne({
            where: { email },
        });

        return user;
    }
}
