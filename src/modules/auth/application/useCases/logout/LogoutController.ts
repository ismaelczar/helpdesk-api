import type { Request, Response } from "express";
import { container } from "tsyringe";
import { ensureAuthenticated } from "@/main/http/middlewares/ensureAuthenticated";
import { ApiResponse } from "@/shared/http/docs/decorators/ApiResponse";
import { Controller } from "@/shared/http/docs/decorators/Controller";
import { Post } from "@/shared/http/docs/decorators/methods/Post";
import { UseMiddleware } from "@/shared/http/docs/decorators/UseMiddleware";
import { LogoutUseCase } from "./LogoutUseCase";

@Controller("/auth")
export class LogoutController {
    @Post("/logout")
    @ApiResponse({
        statusCode: 204,
        description: "Logout successful.",
    })
    @UseMiddleware(ensureAuthenticated)
    async handle(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;

        const useCase = container.resolve(LogoutUseCase);

        const result = await useCase.execute(email);

        return res.status(204).json(result);
    }
}
