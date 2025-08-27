import "reflect-metadata";
import type { Ticket } from "@/modules/tickets/domain/entities/Ticket";
import type { ITicketsRepository } from "@/modules/tickets/domain/repositories/ITicketRepository";
import { GetDashboardSummaryUseCase } from "./GetDashboardSummaryUseCase";

describe("GetDashboardSummary", () => {
    let useCase: GetDashboardSummaryUseCase;
    let ticketsRepository: jest.Mocked<ITicketsRepository>;

    const fakeTickets: Ticket[] = [
        { id: "1", status: "open" } as any,
        { id: "2", status: "closed" } as any,
    ];

    beforeEach(() => {
        ticketsRepository = {
            findByStatus: jest.fn(),
            findByType: jest.fn(),
            findOpenByAgent: jest.fn(),
            findCloseByAgent: jest.fn(),
        } as any;

        useCase = new GetDashboardSummaryUseCase(ticketsRepository);
        jest.clearAllMocks();
    });

    it("should return a dashboard summary with all ticket arrays", async () => {
        ticketsRepository.findByStatus.mockResolvedValue(fakeTickets);
        ticketsRepository.findByType.mockResolvedValue(fakeTickets);
        ticketsRepository.findOpenByAgent.mockResolvedValue(fakeTickets);
        ticketsRepository.findCloseByAgent.mockResolvedValue(fakeTickets);

        const result = await useCase.execute();

        expect(ticketsRepository.findByStatus).toHaveBeenCalled();
        expect(ticketsRepository.findByType).toHaveBeenCalled();
        expect(ticketsRepository.findOpenByAgent).toHaveBeenCalled();
        expect(ticketsRepository.findCloseByAgent).toHaveBeenCalled();

        expect(result).toEqual({
            statusSummary: fakeTickets,
            typeSummary: fakeTickets,
            openTicketSummary: fakeTickets,
            closeTicketSummary: fakeTickets,
        });
    });
});
