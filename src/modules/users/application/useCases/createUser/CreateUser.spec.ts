import "reflect-metadata";
import assert from "node:assert";
import { beforeEach, describe, it } from "@jest/globals";
import { AppError } from "@/shared/core/erros/AppError";
import { makeUser } from "@/shared/test/factories/userFactory";
import { FakeUserRepository } from "@/shared/test/fakes/FakeUserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

describe("CreateUser", () => {
    let fakeUserRepository: FakeUserRepository;
    let createUserUseCase: CreateUserUseCase;

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        createUserUseCase = new CreateUserUseCase(fakeUserRepository as any);
    });

    it("should be able to return a error when user already exists", async () => {
        const existingUser = makeUser({ email: "john@example.com" });
        await fakeUserRepository.createUser(existingUser);

        await assert.rejects(
            () =>
                createUserUseCase.execute(
                    "John Doe",
                    "123456",
                    "john@example.com",
                    "admin"
                ),
            (error: any) => {
                assert.ok(error instanceof AppError);
                assert.equal(
                    error.message,
                    "User with this email already exists."
                );
                return true;
            }
        );
    });

    it('"should be able to create a new user', async () => {
        const user = await createUserUseCase.execute(
            "John Doe",
            "123456",
            "john@example.com",
            "admin"
        );

        assert.ok(user);
        assert.equal(user.name, "John Doe");
        assert.equal(user.email, "john@example.com");
        assert.equal(user.role, "admin");
        assert.ok(!("password" in user));
    });
});
