import { inject, injectable } from "tsyringe";
import type { ITicketsRepository } from "@/modules/tickets/domain/repositories/ITicketRepository";

@injectable()
export class GetDashboardSummaryUseCase {
    constructor(
        @inject("TicketsRepository")
        private readonly ticketsRepository: ITicketsRepository
    ) {}

    async execute(): Promise<any> {
        return {
            statusSummary: await this.ticketsRepository.findByStatus(),
            typeSummary: await this.ticketsRepository.findByType(),
            openTicketSummary: await this.ticketsRepository.findOpenByAgent(),
            closeTicketSummary: await this.ticketsRepository.findCloseByAgent(),
        };
    }
}
