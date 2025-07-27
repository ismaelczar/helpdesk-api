import type { CreateTicketDTO } from "../dto/CreateTicketDTO";
import type { Ticket } from "../entities/Ticket";

export interface ITicketsRepository {
    findDuplicatedOpenTicket(
        type: string,
        status: string,
        customer_id: string
    ): Promise<Ticket | null>;

    createTicket(ticket: CreateTicketDTO): Promise<Ticket | null>;
}
