import { inject, injectable } from "tsyringe";
import type { CreateTicketDTO } from "@/modules/tickets/domain/dto/CreateTicketDTO";
import type { Ticket } from "@/modules/tickets/domain/entities/Ticket";
import type { ITicketsRepository } from "@/modules/tickets/domain/repositories/ITicketRepository";
import { AppError } from "@/shared/core/erros/AppError";

@injectable()
export class CreateTicketUseCase {
    constructor(
        @inject("TicketsRepository")
        private readonly ticketsRepository: ITicketsRepository
    ) {}
    async execute(
        data: CreateTicketDTO,
        creatorId: string
    ): Promise<Ticket | null> {
        const { title, type, description, status, customer_id } = data;

        if (status === "open") {
            const alreadyOpenTicketForType =
                await this.ticketsRepository.findDuplicatedOpenTicket(
                    type,
                    customer_id,
                    "open"
                );

            if (alreadyOpenTicketForType)
                throw new AppError(
                    "there is already an open ticket of this type for this customer",
                    409,
                    "business"
                );
        }

        const ticket: CreateTicketDTO = {
            title,
            type,
            status,
            description,
            customer_id,
            creator_id: creatorId,
        };

        const result = await this.ticketsRepository.createTicket(ticket);

        const creator = { ...result?.creator };

        delete creator.password;

        const response = {
            ...result,
            creator,
        };

        return response as Ticket;
    }
}
