import "reflect-metadata";
import type { StatusType } from "@/modules/tickets/domain/dto/StatusType";
import type { UpdateTicketDTO } from "@/modules/tickets/domain/dto/UpdateTicketDTO";
import type { Ticket } from "@/modules/tickets/domain/entities/Ticket";
import type { ITicketHistoryRepository } from "@/modules/tickets/domain/repositories/ITicketHistoryRepository";
import type { ITicketsRepository } from "@/modules/tickets/domain/repositories/ITicketRepository";
import { AppError } from "@/shared/core/erros/AppError";
import { UpdatedTicketUseCase } from "./UpdateTicketUseCase";

function makeFakeTicket(overrides: Partial<Ticket> = {}): Ticket {
    return {
        id: "ticket-123",
        protocol: "PROT-001",
        title: "Chamado teste",
        type: "support",
        description: "Descrição do chamado",
        status: "open" as StatusType,
        resolution_notes: "",
        customer_id: "customer-123",
        customer: {} as any,
        creator_id: "creator-123",
        creator: {} as any,
        assigned_agent: {} as any,
        assigned_agent_id: "",
        updated_at: new Date(),
        created_at: new Date(),
        ticket_history: [],
        gerarProtocolo: jest.fn(),
        ...overrides,
    };
}

describe("UpdatedTicket", () => {
    let useCase: UpdatedTicketUseCase;
    let ticketsRepository: jest.Mocked<ITicketsRepository>;
    let ticketHistoryRepository: jest.Mocked<ITicketHistoryRepository>;

    const authenticatedUserId = "user-123";
    const ticketId = "ticket-123";

    beforeEach(() => {
        ticketsRepository = {
            findById: jest.fn(),
            updateTicket: jest.fn(),
        } as any;

        ticketHistoryRepository = {
            createHistory: jest.fn(),
        } as any;

        useCase = new UpdatedTicketUseCase(
            ticketsRepository,
            ticketHistoryRepository
        );
        jest.clearAllMocks();
    });

    it("should throw an error if the ticket does not exist", async () => {
        ticketsRepository.findById.mockResolvedValue(null);

        await expect(
            useCase.execute(
                authenticatedUserId,
                { status: "open" as StatusType, resolution_notes: "" },
                ticketId
            )
        ).rejects.toThrow(new AppError("Ticket not found", 404, "business"));
    });

    it("should throw an error if the ticket is closed", async () => {
        ticketsRepository.findById.mockResolvedValue(
            makeFakeTicket({ status: "closed" })
        );

        await expect(
            useCase.execute(
                authenticatedUserId,
                { status: "closed" as StatusType, resolution_notes: "" },
                ticketId
            )
        ).rejects.toThrow(
            new AppError("Closed tickets cannot be updated", 400, "business")
        );
    });

    it("should update the ticket and create a history entry when the status changes", async () => {
        const ticket = makeFakeTicket({ status: "open" });
        ticketsRepository.findById.mockResolvedValue(ticket);
        ticketsRepository.updateTicket.mockResolvedValue({
            ...ticket,
            status: "in_progress",
            resolution_notes: "Investigando problema",
            gerarProtocolo: jest.fn(),
        });

        const updateDto: UpdateTicketDTO = {
            status: "in_progress" as StatusType,
            resolution_notes: "Investigando problema",
        };

        const result = await useCase.execute(
            authenticatedUserId,
            updateDto,
            ticketId
        );

        expect(ticketsRepository.findById).toHaveBeenCalledWith(ticketId);
        expect(ticketsRepository.updateTicket).toHaveBeenCalledWith(
            expect.objectContaining({
                id: ticket.id,
                status: "in_progress",
                resolution_notes: "Investigando problema",
                assigned_agent_id: authenticatedUserId,
            })
        );
        expect(ticketHistoryRepository.createHistory).toHaveBeenCalledWith({
            ticket_id: ticket.id,
            user_id: authenticatedUserId,
            action: "Changed",
            details: `Status changed from open to in_progress\n`,
        });
        expect(result.status).toBe("in_progress");
    });

    it("should update the ticket but not create a history entry when the status does not change", async () => {
        const ticket = makeFakeTicket({ status: "open" });
        ticketsRepository.findById.mockResolvedValue(ticket);
        ticketsRepository.updateTicket.mockResolvedValue({
            ...ticket,
            resolution_notes: "Nova nota",
            gerarProtocolo: jest.fn(),
        });

        const updateDto: UpdateTicketDTO = {
            status: "open" as StatusType,
            resolution_notes: "Nova nota",
        };

        const result = await useCase.execute(
            authenticatedUserId,
            updateDto,
            ticketId
        );

        expect(ticketsRepository.updateTicket).toHaveBeenCalled();
        expect(ticketHistoryRepository.createHistory).not.toHaveBeenCalled();
        expect(result.resolution_notes).toBe("Nova nota");
    });
});
