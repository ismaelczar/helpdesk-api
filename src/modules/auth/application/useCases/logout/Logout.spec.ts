import { deleteCache } from "@/shared/providers/redis/cashHelper";
import { LogoutUseCase } from "./LogoutUseCase";

jest.mock("@/shared/providers/redis/cashHelper", () => ({
    deleteCache: jest.fn(),
}));

describe("Logout", () => {
    let useCase: LogoutUseCase;

    beforeEach(() => {
        useCase = new LogoutUseCase();
        jest.clearAllMocks();
    });

    it("should delete refresh token from cache", async () => {
        const email = "test@example.com";
        await useCase.execute(email);

        expect(deleteCache).toHaveBeenCalledWith(`refreshToken:${email}`);
    });
});
