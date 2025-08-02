import { inject, injectable } from "tsyringe";
import type { Ticket } from "@/modules/tickets/domain/entities/Ticket";
import type { ITicketsRepository } from "@/modules/tickets/domain/repositories/ITicketRepository";

@injectable()
export class GetTicketsUseCase {
    constructor(
        @inject("TicketsRepository")
        private readonly ticketsRepository: ITicketsRepository
    ) {}

    async execute(): Promise<Ticket[]> {
        const tickets = await this.ticketsRepository.findAll();

        if (!tickets) {
            return [];
        }

        return tickets;
    }
}
