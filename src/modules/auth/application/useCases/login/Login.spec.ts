import "reflect-metadata";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import type { IUsersRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { AppError } from "@/shared/core/erros/AppError";
import { setCache } from "@/shared/providers/redis/cashHelper";
import { LoginUseCase } from "./LoginUseCase";

jest.mock("bcrypt", () => ({ compare: jest.fn() }));
jest.mock("jsonwebtoken", () => ({ sign: jest.fn() }));
jest.mock("@/shared/providers/redis/cashHelper", () => ({
    setCache: jest.fn(),
}));

describe("Login", () => {
    let useCase: LoginUseCase;
    let usersRepository: jest.Mocked<IUsersRepository>;

    const email = "test@example.com";
    const password = "123456";

    beforeEach(() => {
        usersRepository = { findByEmail: jest.fn() } as any;
        useCase = new LoginUseCase(usersRepository);
        jest.clearAllMocks();
        process.env.JWT_SECRET = "secret";
    });

    it("should throw if user does not exist", async () => {
        usersRepository.findByEmail.mockResolvedValue(null);

        await expect(useCase.execute(email, password)).rejects.toThrow(
            new AppError("User not found", 401, "validation")
        );
    });

    it("should throw if password is incorrect", async () => {
        usersRepository.findByEmail.mockResolvedValue({
            id: "1",
            password: "hash",
            role: "user",
        } as any);
        (compare as jest.Mock).mockResolvedValue(false);

        await expect(useCase.execute(email, password)).rejects.toThrow(
            new AppError("Incorrect password", 401, "validation")
        );
    });

    it("should return token and refreshToken when login is successful", async () => {
        const user = { id: "1", password: "hash", role: "user" } as any;
        usersRepository.findByEmail.mockResolvedValue(user);
        (compare as jest.Mock).mockResolvedValue(true);
        (sign as jest.Mock).mockImplementation(
            (payload, secret, options) => `${options.subject}-token`
        );

        const result = await useCase.execute(email, password);

        expect(result.token).toBe("1-token");
        expect(result.refreshToken).toBe(`${email}-token`);
        expect(setCache).toHaveBeenCalledWith(
            `refreshToken:${email}`,
            `${email}-token`,
            60 * 60 * 24
        );
    });
});
