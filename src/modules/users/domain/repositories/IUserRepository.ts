import type { CreateUserDTO } from "../dto/CreateUserDTO";
import type { User } from "../entities/User";

export interface IUsersRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    createUser(data: CreateUserDTO): Promise<User>;
}
