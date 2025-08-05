import { inject, injectable } from "tsyringe";
import type { FilterTicketsDTO } from "@/modules/tickets/domain/dto/FilterTicketsDTO";
import type { Ticket } from "@/modules/tickets/domain/entities/Ticket";
import type { ITicketsRepository } from "@/modules/tickets/domain/repositories/ITicketRepository";

@injectable()
export class GetTicketsUseCase {
    constructor(
        @inject("TicketsRepository")
        private readonly ticketsRepository: ITicketsRepository
    ) {}

    async execute(filters: FilterTicketsDTO): Promise<Ticket[]> {
        return await this.ticketsRepository.findWithFilters(filters);
    }
}
