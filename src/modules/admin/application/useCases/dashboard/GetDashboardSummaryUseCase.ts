import { inject, injectable } from "tsyringe";
import type { Ticket } from "@/modules/tickets/domain/entities/Ticket";
import type { ITicketsRepository } from "@/modules/tickets/domain/repositories/ITicketRepository";

interface DashboardSummary {
    statusSummary: Ticket[];
    typeSummary: Ticket[];
    openTicketSummary: Ticket[];
    closeTicketSummary: Ticket[];
}

@injectable()
export class GetDashboardSummaryUseCase {
    constructor(
        @inject("TicketsRepository")
        private readonly ticketsRepository: ITicketsRepository
    ) {}

    async execute(): Promise<DashboardSummary> {
        const [
            statusSummary,
            typeSummary,
            openTicketSummary,
            closeTicketSummary,
        ] = await Promise.all([
            this.ticketsRepository.findByStatus(),
            this.ticketsRepository.findByType(),
            this.ticketsRepository.findOpenByAgent(),
            this.ticketsRepository.findCloseByAgent(),
        ]);

        return {
            statusSummary,
            typeSummary,
            openTicketSummary,
            closeTicketSummary,
        };
    }
}
