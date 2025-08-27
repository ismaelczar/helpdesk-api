import "reflect-metadata";
import { TicketType } from "@/modules/tickets/domain/dto/TicketType";
import { AppError } from "@/shared/core/erros/AppError";
import { FakeTicketsRepository } from "@/shared/test/fakes/FakeTicketsRepository";
import { CreateTicketUseCase } from "./CreateTicketUseCase";

describe("CreateTicket", () => {
    let ticketsRepository: FakeTicketsRepository;
    let useCase: CreateTicketUseCase;

    beforeEach(() => {
        ticketsRepository = new FakeTicketsRepository();
        useCase = new CreateTicketUseCase(ticketsRepository);
    });

    it("should create a ticket successfully", async () => {
        const data = {
            title: "System error",
            type: TicketType.CorrigirParametrizarSistema,
            description: "Blank screen when logging in",
            customer_id: "customer-123",
            creator_id: "user-999",
        };

        const result = await useCase.execute(data, "user-999");

        expect(result).toBeDefined();
        expect(result?.id).toBeDefined();
        expect(result?.status).toBe("open");
        expect(result?.creator_id).toBe("user-999");
        expect(result?.title).toBe(data.title);
    });

    it("should not create a duplicated open ticket for the same customer and type", async () => {
        await useCase.execute(
            {
                title: "Initial error",
                type: TicketType.CorrigirParametrizarSistema,
                description: "First error",
                customer_id: "customer-123",
                creator_id: "user-999",
            },
            "user-1"
        );

        await expect(
            useCase.execute(
                {
                    title: "Duplicated error",
                    type: TicketType.CorrigirParametrizarSistema, // same type and customer
                    description: "Trying to duplicate",
                    customer_id: "customer-123",
                    creator_id: "user-999",
                },
                "user-2"
            )
        ).rejects.toBeInstanceOf(AppError);
    });
});
