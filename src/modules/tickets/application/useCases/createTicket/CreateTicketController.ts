import type { Request, Response } from "express";
import { container } from "tsyringe";
import { ensureAuthenticated } from "@/main/http/middlewares/ensureAuthenticated";
import { CreateTicketDTO } from "@/modules/tickets/domain/dto/CreateTicketDTO";
import { CreateTicketResponse } from "@/modules/tickets/domain/dto/CreateTicketResponse";
import { ApiResponse } from "@/shared/http/docs/decorators/ApiResponse";
import { Body } from "@/shared/http/docs/decorators/Body";
import { Controller } from "@/shared/http/docs/decorators/Controller";
import { Post } from "@/shared/http/docs/decorators/methods/Post";
import { UseMiddleware } from "@/shared/http/docs/decorators/UseMiddleware";
import { CreateTicketUseCase } from "./CreateTicketUseCase";

@Controller("/tickets")
export class CreateTicketController {
    @Post("/")
    @ApiResponse({
        statusCode: 200,
        dtoClass: CreateTicketResponse,
        description: "Chamado criado com sucesso",
    })
    @Body(CreateTicketDTO)
    @UseMiddleware(ensureAuthenticated)
    async handle(req: Request, res: Response): Promise<Response> {
        // biome-ignore lint/style/noNonNullAssertion: <the id comes through the subject>
        const creatorId = req.user?.id!;
        const data: CreateTicketDTO = req.body;

        const useCase = container.resolve(CreateTicketUseCase);
        const response = await useCase.execute(data, creatorId);

        return res.status(200).json(response);
    }
}
