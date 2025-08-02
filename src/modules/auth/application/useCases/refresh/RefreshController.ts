import type { Request, Response } from "express";
import { container } from "tsyringe";
import { ApiResponse } from "@/shared/http/docs/decorators/ApiResponse";
import { Controller } from "@/shared/http/docs/decorators/Controller";
import { Post } from "@/shared/http/docs/decorators/methods/Post";
import { RefreshUseCase } from "./RefreshUseCase";

@Controller("/auth")
export class RefreshController {
    @Post("/refresh")
    @ApiResponse({
        statusCode: 200,
        description: "Refresh token successfully",
    })
    async handle(req: Request, res: Response): Promise<Response> {
        const { refreshToken } = req.body;

        const useCase = container.resolve(RefreshUseCase);

        const response = await useCase.execute(refreshToken);

        return res.status(200).json(response);
    }
}
