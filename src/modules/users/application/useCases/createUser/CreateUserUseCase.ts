import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import type { User } from "@/modules/users/domain/entities/User";
import type { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { AppError } from "@/shared/core/erros/AppError";

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private readonly userRepository: IUserRepository
    ) {}

    async execute(
        name: string,
        password: string,
        email: string
    ): Promise<User> {
        const userExist = await this.userRepository.findByEmail(email);

        if (userExist) {
            throw new AppError(
                "User with this email already exists.",
                409,
                "validation"
            );
        }

        const encryptedPass = await hash(password, 8);

        const user = await this.userRepository.createUser({
            name,
            email,
            password: encryptedPass,
        });

        return user;
    }
}
