import { sign, verify } from "jsonwebtoken";
import { AppError } from "@/shared/core/erros/AppError";
import { getCache } from "@/shared/providers/redis/cashHelper";
import { RefreshUseCase } from "./RefreshUseCase";

jest.mock("@/shared/providers/redis/cashHelper", () => ({
    getCache: jest.fn(),
}));
jest.mock("jsonwebtoken", () => ({ verify: jest.fn(), sign: jest.fn() }));

describe("Refresh", () => {
    let useCase: RefreshUseCase;
    const refreshToken = "refresh-token";
    const email = "test@example.com";

    beforeEach(() => {
        useCase = new RefreshUseCase();
        jest.clearAllMocks();
        process.env.JWT_SECRET = "secret";
    });

    it("should throw if refresh token does not exist in cache", async () => {
        (verify as jest.Mock).mockReturnValue({ email });
        (getCache as jest.Mock).mockResolvedValue(null);

        await expect(useCase.execute(refreshToken)).rejects.toThrow(
            new AppError("Refresh Token does not exists", 401, "business")
        );
    });

    it("should throw if refresh token in cache does not match", async () => {
        (verify as jest.Mock).mockReturnValue({ email });
        (getCache as jest.Mock).mockResolvedValue("other-token");

        await expect(useCase.execute(refreshToken)).rejects.toThrow(
            new AppError("Refresh Token does not exists", 401, "business")
        );
    });

    it("should return a new token if refresh token is valid", async () => {
        (verify as jest.Mock).mockReturnValue({ email });
        (getCache as jest.Mock).mockResolvedValue(refreshToken);
        (sign as jest.Mock).mockReturnValue("new-token");

        const result = await useCase.execute(refreshToken);

        expect(result).toBe("new-token");
        expect(sign).toHaveBeenCalledWith({ email }, process.env.JWT_SECRET, {
            subject: email,
            expiresIn: "1h",
        });
    });
});
