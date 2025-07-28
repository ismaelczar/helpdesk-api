import { inject, injectable } from "tsyringe";
import type { UpdateTicketDTO } from "@/modules/tickets/domain/dto/UpdateTicketDTO";
import type { Ticket } from "@/modules/tickets/domain/entities/Ticket";
import type { ITicketsRepository } from "@/modules/tickets/domain/repositories/ITicketRepository";
import { AppError } from "@/shared/core/erros/AppError";

@injectable()
export class UpdatedTicketUseCase {
    constructor(
        @inject("TicketsRepository")
        private readonly ticketsRepository: ITicketsRepository
    ) {}

    async execute(
        assignedAgentId: string,
        data: UpdateTicketDTO,
        ticketId: string
    ): Promise<Ticket> {
        const { status, resolution_notes } = data;
        const ticketExist = await this.ticketsRepository.findById(ticketId);

        if (!ticketExist)
            throw new AppError("Ticket not found", 404, "business");

        if (ticketExist.status === "closed")
            throw new AppError(
                "Closed tickets cannot be updated",
                400,
                "business"
            );

        const ticket: Partial<Ticket> = {
            ...ticketExist,
            status: status,
            resolution_notes: resolution_notes,
            assigned_agent_id: assignedAgentId,
            updated_at: new Date(),
        };

        const result = await this.ticketsRepository.updateTicket(ticket);

        return result;
    }
}
