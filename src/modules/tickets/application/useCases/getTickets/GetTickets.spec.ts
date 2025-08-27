import "reflect-metadata";
import type { FilterTicketsDTO } from "@/modules/tickets/domain/dto/FilterTicketsDTO";
import type { Ticket } from "@/modules/tickets/domain/entities/Ticket";
import type { ITicketsRepository } from "@/modules/tickets/domain/repositories/ITicketRepository";
import { GetTicketsUseCase } from "./GetTicketsUseCase";

jest.mock("@/shared/providers/redis/cashHelper", () => ({
    getCache: jest.fn(),
    setCache: jest.fn(),
}));

import { getCache, setCache } from "@/shared/providers/redis/cashHelper";

describe("GetTickets", () => {
    let useCase: GetTicketsUseCase;
    let ticketsRepository: jest.Mocked<ITicketsRepository>;

    const filters: FilterTicketsDTO = { status: "open" } as any;
    const tickets: Ticket[] = [{ id: "1", title: "Chamado teste" } as any];

    beforeEach(() => {
        ticketsRepository = {
            findWithFilters: jest.fn(),
        } as any;

        useCase = new GetTicketsUseCase(ticketsRepository);

        jest.clearAllMocks();
    });

    it("deve retornar tickets do cache se existirem", async () => {
        (getCache as jest.Mock).mockResolvedValue(tickets);

        const result = await useCase.execute(filters);

        expect(getCache).toHaveBeenCalledWith(
            `tickets-list:${JSON.stringify(filters)}`
        );
        expect(result).toEqual(tickets);
        expect(ticketsRepository.findWithFilters).not.toHaveBeenCalled();
        expect(setCache).not.toHaveBeenCalled();
    });

    it("deve buscar tickets do repositório se não houver cache", async () => {
        (getCache as jest.Mock).mockResolvedValue(null);
        ticketsRepository.findWithFilters.mockResolvedValue(tickets);

        const result = await useCase.execute(filters);

        expect(getCache).toHaveBeenCalled();
        expect(ticketsRepository.findWithFilters).toHaveBeenCalledWith(filters);
        expect(setCache).toHaveBeenCalledWith(
            `tickets-list:${JSON.stringify(filters)}`,
            tickets,
            60 * 60 * 24
        );
        expect(result).toEqual(tickets);
    });

    it("deve retornar lista vazia se repositório não encontrar tickets", async () => {
        (getCache as jest.Mock).mockResolvedValue(null);
        ticketsRepository.findWithFilters.mockResolvedValue([]);

        const result = await useCase.execute(filters);

        expect(result).toEqual([]);
        expect(setCache).toHaveBeenCalledWith(
            `tickets-list:${JSON.stringify(filters)}`,
            [],
            60 * 60 * 24
        );
    });
});
