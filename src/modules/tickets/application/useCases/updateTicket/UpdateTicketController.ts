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
        statusCode: 200,
        description: "Ticket updated successfully",
    })
    @UseMiddleware(ensureAuthenticated)
    async handle(req: Request, res: Response): Promise<Response> {
        const authenticatedUserId = req.user?.id!;
        const ticketId = req.params.id!;
        const data: UpdateTicketDTO = req.body;

        const useCase = container.resolve(UpdatedTicketUseCase);
        const response = await useCase.execute(
            authenticatedUserId,
            data,
            ticketId
        );

        return res.status(200).json(response);
    }
}
