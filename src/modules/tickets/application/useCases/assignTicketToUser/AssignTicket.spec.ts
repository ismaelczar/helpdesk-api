import "reflect-metadata";
import { AppError } from "@/shared/core/erros/AppError";
import { FakeTicketHistoryRepository } from "@/shared/test/fakes/FakeHistoryRepository";
import { FakeTicketsRepository } from "@/shared/test/fakes/FakeTicketsRepository";
import { AssignTicketToUserUseCase } from "./AssignTicketToUserUseCase";

describe("AssignTicket", () => {
    let ticketsRepository: FakeTicketsRepository;
    let historyRepository: FakeTicketHistoryRepository;
    let useCase: AssignTicketToUserUseCase;

    beforeEach(() => {
        ticketsRepository = new FakeTicketsRepository();
        historyRepository = new FakeTicketHistoryRepository();
        useCase = new AssignTicketToUserUseCase(
            ticketsRepository,
            historyRepository
        );
    });

    it("deve atribuir um ticket a um agente", async () => {
        // Arrange: criar um ticket fake
        const ticket = await ticketsRepository.createTicket({
            type: "support",
            customer_id: "customer-123",
            status: "open",
            protocol: "PROTO-001",
            creator_id: "creator-123",
        } as any);

        // Act: atribuir ao agente
        const updated = await useCase.execute("agent-999", ticket!.id);

        // Assert: verificar se foi atualizado
        expect(updated.assigned_agent_id).toBe("agent-999");
        expect(updated.updated_at).toBeInstanceOf(Date);

        // Verificar se histórico foi criado
        const histories = (historyRepository as any).histories;
        expect(histories).toHaveLength(1);
        expect(histories[0]).toMatchObject({
            ticket_id: ticket!.id,
            user_id: "agent-999",
            action: "Assigned",
        });
    });

    it("deve lançar erro se o ticket não existir", async () => {
        await expect(
            useCase.execute("agent-999", "non-existent-id")
        ).rejects.toBeInstanceOf(AppError);
    });
});
