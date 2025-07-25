import type { CreateUserDTO } from "../dto/CreateUserDTO";
import type { User } from "../entities/User";

export interface IUserRepository {
    createUser(data: CreateUserDTO): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
