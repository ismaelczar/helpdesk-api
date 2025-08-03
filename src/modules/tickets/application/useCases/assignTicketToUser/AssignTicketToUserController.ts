import type { Request, Response } from "express";
import { container } from "tsyringe";
import { ensureAdmin } from "@/main/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@/main/http/middlewares/ensureAuthenticated";
import { ApiResponse } from "@/shared/http/docs/decorators/ApiResponse";
import { Controller } from "@/shared/http/docs/decorators/Controller";
import { Put } from "@/shared/http/docs/decorators/methods/Put";
import { UseMiddleware } from "@/shared/http/docs/decorators/UseMiddleware";
import { AssignTicketToUserUseCase } from "./AssignTicketToUserUseCase";

@Controller("/tickets")
export class AssignTicketToUserController {
    @Put("/:id/assign")
    @ApiResponse({
        statusCode: 200,
        description: "Ticket assigned to user successfully",
    })
    @UseMiddleware(ensureAuthenticated, ensureAdmin)
    async handle(req: Request, res: Response): Promise<Response> {
        const assignedAgentId = req.body.id;
        const ticketId = req.params.id;

        const useCase = container.resolve(AssignTicketToUserUseCase);

        const response = await useCase.execute(assignedAgentId, ticketId);

        return res.status(200).json(response);
    }
}
