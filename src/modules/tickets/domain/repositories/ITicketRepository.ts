import type { CreateTicketDTO } from "../dto/CreateTicketDTO";
import type { FilterTicketsDTO } from "../dto/FilterTicketsDTO";
import type { Ticket } from "../entities/Ticket";

export interface ITicketsRepository {
    findAll(): Promise<Ticket[]>;
    findById(id: string): Promise<Ticket | null>;
    findDuplicatedOpenTicket(
        type: string,
        status: string,
        customer_id: string
    ): Promise<Ticket | null>;

    findWithFilters(filters: FilterTicketsDTO): Promise<Ticket[]>;
    findByType(): Promise<Ticket[]>;
    findByStatus(): Promise<Ticket[]>;
    findOpenByAgent(): Promise<Ticket[]>;
    findCloseByAgent(): Promise<Ticket[]>;

    createTicket(ticket: CreateTicketDTO): Promise<Ticket | null>;
    updateTicket(ticket: Partial<Ticket>): Promise<Ticket>;
}
