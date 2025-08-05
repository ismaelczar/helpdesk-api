import { inject, injectable } from "tsyringe";
import type { Ticket } from "@/modules/tickets/domain/entities/Ticket";
import type { ITicketHistoryRepository } from "@/modules/tickets/domain/repositories/ITicketHistoryRepository";
import type { ITicketsRepository } from "@/modules/tickets/domain/repositories/ITicketRepository";
import { AppError } from "@/shared/core/erros/AppError";

@injectable()
export class AssignTicketToUserUseCase {
    constructor(
        @inject("TicketsRepository")
        private readonly ticketsRepository: ITicketsRepository,

        @inject("TicketHistoryRepository")
        private readonly ticketsHistoryRepository: ITicketHistoryRepository
    ) {}

    async execute(assignedAgentId: string, ticketId: string): Promise<Ticket> {
        const ticket = await this.ticketsRepository.findById(ticketId);

        if (!ticket) throw new AppError("Ticket not found", 404, "business");

        const assignedAgentToTicket = {
            ...ticket,
            assigned_agent_id: assignedAgentId,
            updated_at: new Date(),
        };

        const ticketUpdated = await this.ticketsRepository.updateTicket(
            assignedAgentToTicket
        );

        await this.ticketsHistoryRepository.createHistory({
            ticket_id: ticket.id,
            user_id: assignedAgentId,
            action: `Assigned`,
            details: `Assigned to agent ${assignedAgentId}`,
        });

        return ticketUpdated;
    }
}
