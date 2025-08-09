import { deleteCache } from "@/shared/providers/redis/cashHelper";

export class LogoutUseCase {
    async execute(email: string): Promise<void> {
        await deleteCache(`refreshToken:${email}`);
    }
}
