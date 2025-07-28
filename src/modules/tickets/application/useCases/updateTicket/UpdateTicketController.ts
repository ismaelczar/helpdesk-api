import type { Request, Response } from "express";
import { container } from "tsyringe";
import { ensureAuthenticated } from "@/main/http/middlewares/ensureAuthenticated";
import type { UpdateTicketDTO } from "@/modules/tickets/domain/dto/UpdateTicketDTO";
import { ApiResponse } from "@/shared/http/docs/decorators/ApiResponse";
import { Controller } from "@/shared/http/docs/decorators/Controller";
import { Put } from "@/shared/http/docs/decorators/methods/Put";
import { UseMiddleware } from "@/shared/http/docs/decorators/UseMiddleware";
import { UpdatedTicketUseCase } from "./UpdateTicketUseCase";

@Controller("/tickets")
export class UpdatedTicketController {
    @Put("/:id")
    @ApiResponse({
        statusCode: 201,
        description: "Chamado atualizado com sucesso.",
    })
    @UseMiddleware(ensureAuthenticated)
    async handle(req: Request, res: Response): Promise<Response> {
        // biome-ignore lint/style/noNonNullAssertion: <subject>
        const assignedAgentId = req.user?.id!;
        // biome-ignore lint/style/noNonNullAssertion: <params>
        const { id } = req.params!;
        const data: UpdateTicketDTO = req.body;

        const useCase = container.resolve(UpdatedTicketUseCase);
        const response = await useCase.execute(assignedAgentId, data, id);

        return res.status(200).json(response);
    }
}
