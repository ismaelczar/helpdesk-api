import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import type { LoginResponse } from "@/modules/auth/domain/dto/LoginResponse";
import type { IUsersRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { AppError } from "@/shared/core/erros/AppError";
import { setChash } from "@/shared/providers/redis/cashHelper";

@injectable()
export class LoginUseCase {
    constructor(
        @inject("UsersRepository") private readonly ormRepo: IUsersRepository
    ) {}

    async execute(email: string, password: string): Promise<LoginResponse> {
        const userExist = await this.ormRepo.findByEmail(email);

        if (!userExist) {
            throw new AppError("User not found", 401, "validation");
        }

        const passwordMatch = await compare(password, userExist.password);

        if (!passwordMatch)
            throw new AppError("Incorrect password", 401, "validation");

        // biome-ignore lint/style/noNonNullAssertion: <Token>
        const token = sign({ id: userExist.id }, process.env.JWT_SECRET!, {
            subject: `${userExist.id}`,
            expiresIn: "1h",
        });

        // biome-ignore lint/style/noNonNullAssertion: <Token>
        const refreshToken = sign({ email }, process.env.JWT_SECRET!, {
            subject: email,
            expiresIn: "1d",
        });

        await setChash(`refreshToken:${email}`, refreshToken, 60 * 60 * 24);

        return { token, refreshToken };
    }
}
