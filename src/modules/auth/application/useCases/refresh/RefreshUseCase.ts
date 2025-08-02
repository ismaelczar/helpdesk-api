import { sign, verify } from "jsonwebtoken";
import { AppError } from "@/shared/core/erros/AppError";
import { getCash } from "@/shared/providers/redis/cashHelper";

export class RefreshUseCase {
    async execute(refreshToken: string): Promise<string> {
        // biome-ignore lint/style/noNonNullAssertion: <token>
        const decoded = verify(refreshToken, process.env.JWT_SECRET!) as any;

        const savedRefreshToken = await getCash(
            `refreshToken:${decoded.email}`
        );

        if (!savedRefreshToken || savedRefreshToken !== refreshToken)
            throw new AppError(
                "Refresh Token does not exists",
                401,
                "business"
            );

        const token = sign({ email: decoded.email }, process.env.JWT_SECRET!, {
            subject: `${decoded.email}`,
            expiresIn: "1h",
        });

        return token;
    }
}
