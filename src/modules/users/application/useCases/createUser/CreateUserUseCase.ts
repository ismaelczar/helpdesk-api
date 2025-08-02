import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import type { User } from "@/modules/users/domain/entities/User";
import type { IUsersRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { AppError } from "@/shared/core/erros/AppError";

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private readonly usersRepository: IUsersRepository
    ) {}

    async execute(
        name: string,
        password: string,
        email: string,
        role: string
    ): Promise<Omit<User, "password">> {
        const userExist = await this.usersRepository.findByEmail(email);

        if (userExist) {
            throw new AppError(
                "User with this email already exists.",
                409,
                "validation"
            );
        }

        const encryptedPass = await hash(password, 8);

        const user = await this.usersRepository.createUser({
            name,
            email,
            password: encryptedPass,
            role,
        });

        const { password: _, ...safeUser } = user;
        return safeUser;
    }
}
