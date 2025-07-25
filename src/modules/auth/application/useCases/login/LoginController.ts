import type { Request, Response } from "express";
import { container } from "tsyringe";
import { ILoginDTO } from "@/modules/auth/domain/dto/ILoginDTO";
import { LoginResponse } from "@/modules/auth/domain/dto/LoginResponse";
import { ApiResponse } from "@/shared/http/docs/decorators/ApiResponse";
import { Body } from "@/shared/http/docs/decorators/Body";
import { Controller } from "@/shared/http/docs/decorators/Controller";
import { Post } from "@/shared/http/docs/decorators/methods/Post";
import { LoginUseCase } from "./LoginUseCase";

@Controller("/auth")
export class LoginController {
    @Post("/login")
    @ApiResponse({
        statusCode: 200,
        dtoClass: LoginResponse,
        description: "Login realizado com sucesso.",
    })
    @Body(ILoginDTO)
    async handle(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        const useCase = container.resolve(LoginUseCase);

        const result = await useCase.execute(email, password);
        return res.json(result);
    }
}
