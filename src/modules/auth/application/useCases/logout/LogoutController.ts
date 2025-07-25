import type { Request, Response } from "express";
import { container } from "tsyringe";
import { ensureAuthenticated } from "@/main/http/middlewares/ensureAuthenticated";
import { Controller } from "@/shared/http/docs/decorators/Controller";
import { Post } from "@/shared/http/docs/decorators/methods/Post";
import { UseMiddleware } from "@/shared/http/docs/decorators/UseMiddleware";
import { LogoutUseCase } from "./LogoutUseCase";

@Controller("/auth")
export class LogoutController {
    @Post("/logout")
    @UseMiddleware(ensureAuthenticated)
    async handle(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;
        const useCase = container.resolve(LogoutUseCase);
        const result = await useCase.execute(email);
        return res.status(201).json(result);
    }
}
