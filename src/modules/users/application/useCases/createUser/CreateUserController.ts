import type { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserDTO } from "@/modules/users/domain/dto/CreateUserDTO";
import { ApiResponse } from "@/shared/http/docs/decorators/ApiResponse";
import { Body } from "@/shared/http/docs/decorators/Body";
import { Controller } from "@/shared/http/docs/decorators/Controller";
import { Post } from "@/shared/http/docs/decorators/methods/Post";
import { CreateUserUseCase } from "./CreateUserUseCase";

@Controller("/users")
export class CreateUserController {
    @Post("/")
    @ApiResponse({
        statusCode: 200,
        dtoClass: CreateUserDTO,
        description: "Usuário cadastrado com sucesso",
    })
    @Body(CreateUserDTO)
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, password, email } = req.body;

        const useCase = container.resolve(CreateUserUseCase);

        const result = await useCase.execute(name, password, email);

        return res.status(201).json(result);
    }
}
