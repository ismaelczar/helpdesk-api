import type { Request, Response } from "express";
import { container } from "tsyringe";
import { ensureAuthenticated } from "@/main/http/middlewares/ensureAuthenticated";
import { Controller } from "@/shared/http/docs/decorators/Controller";
import { Put } from "@/shared/http/docs/decorators/methods/Put";
import { UseMiddleware } from "@/shared/http/docs/decorators/UseMiddleware";
import { AssignTicketToUserUseCase } from "./AssignTicketToUserUseCase";

@Controller("/tickets")
export class AssignTicketToUserController {
    @Put("/:id/assign")
    @UseMiddleware(ensureAuthenticated)
    async handle(req: Request, res: Response): Promise<Response> {
        const ticketId = req.params.id;
        const { assignedAgentId } = req.body;

        const useCase = container.resolve(AssignTicketToUserUseCase);

        const response = await useCase.execute(assignedAgentId, ticketId);

        return res.status(200).json(response);
    }
}
