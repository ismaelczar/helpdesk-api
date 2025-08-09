import { inject, injectable } from "tsyringe";
import type { FilterTicketsDTO } from "@/modules/tickets/domain/dto/FilterTicketsDTO";
import type { Ticket } from "@/modules/tickets/domain/entities/Ticket";
import type { ITicketsRepository } from "@/modules/tickets/domain/repositories/ITicketRepository";
import { getCache, setCache } from "@/shared/providers/redis/cashHelper";

@injectable()
export class GetTicketsUseCase {
    constructor(
        @inject("TicketsRepository")
        private readonly ticketsRepository: ITicketsRepository
    ) {}

    async execute(filters: FilterTicketsDTO): Promise<Ticket[]> {
        const cacheKey = `tickets-list:${JSON.stringify(filters)}`;

        const cachedTickets = await getCache<Ticket[]>(cacheKey);

        if (cachedTickets) return cachedTickets;

        const tickets = await this.ticketsRepository.findWithFilters(filters);

        await setCache(cacheKey, tickets, 60 * 60 * 24);

        return tickets;
    }
}
