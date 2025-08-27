import type { CreateTicketDTO } from "@/modules/tickets/domain/dto/CreateTicketDTO";
import type { FilterTicketsDTO } from "@/modules/tickets/domain/dto/FilterTicketsDTO";
import type { Ticket } from "@/modules/tickets/domain/entities/Ticket";

export class FakeTicketsRepository {
    private tickets: Ticket[] = [];

    async findAll(): Promise<Ticket[]> {
        return this.tickets;
    }

    async findById(id: string): Promise<Ticket | null> {
        return this.tickets.find((t) => t.id === id) ?? null;
    }

    async findDuplicatedOpenTicket(
        type: string,
        customer_id: string,
        status: string
    ): Promise<Ticket | null> {
        return (
            this.tickets.find(
                (t) =>
                    t.type === type &&
                    t.customer_id === customer_id &&
                    t.status === status
            ) ?? null
        );
    }

    async findWithFilters(filters: FilterTicketsDTO): Promise<Ticket[]> {
        return this.tickets.filter((ticket) => {
            if (filters.status && ticket.status !== filters.status)
                return false;
            if (filters.type && ticket.type !== filters.type) return false;
            if (filters.protocol && ticket.protocol !== filters.protocol)
                return false;
            if (
                filters.customer_id &&
                ticket.customer_id !== filters.customer_id
            )
                return false;
            if (
                filters.created_from &&
                ticket.created_at < filters.created_from
            )
                return false;
            if (filters.created_to && ticket.created_at > filters.created_to)
                return false;
            return true;
        });
    }

    async findByStatus(): Promise<any[]> {
        const grouped: Record<string, number> = {};
        this.tickets.forEach((t) => {
            grouped[t.status] = (grouped[t.status] ?? 0) + 1;
        });

        return Object.entries(grouped).map(([status, count]) => ({
            status,
            count,
        }));
    }

    async findByType(): Promise<any[]> {
        const grouped: Record<string, number> = {};
        this.tickets.forEach((t) => {
            grouped[t.type] = (grouped[t.type] ?? 0) + 1;
        });

        return Object.entries(grouped).map(([type, count]) => ({
            type,
            count,
        }));
    }

    async findOpenByAgent(): Promise<any[]> {
        const grouped: Record<string, number> = {};
        this.tickets.forEach((t) => {
            if (t.assigned_agent && t.status !== "closed") {
                grouped[t.assigned_agent.name] =
                    (grouped[t.assigned_agent.name] ?? 0) + 1;
            }
        });

        return Object.entries(grouped).map(([agentName, count]) => ({
            agentName,
            count,
        }));
    }

    async findCloseByAgent(): Promise<any[]> {
        const grouped: Record<string, number> = {};
        this.tickets.forEach((t) => {
            if (t.assigned_agent && t.status !== "open") {
                grouped[t.assigned_agent.name] =
                    (grouped[t.assigned_agent.name] ?? 0) + 1;
            }
        });

        return Object.entries(grouped).map(([agentName, count]) => ({
            agentName,
            count,
        }));
    }

    async createTicket(data: CreateTicketDTO): Promise<Ticket | null> {
        const newTicket = {
            ...data,
            id: crypto.randomUUID(),
            created_at: new Date(),
        } as Ticket;

        this.tickets.push(newTicket);
        return newTicket;
    }

    async updateTicket(ticket: Partial<Ticket>): Promise<Ticket> {
        const index = this.tickets.findIndex((t) => t.id === ticket.id);
        if (index === -1) throw new Error("Ticket not found");

        this.tickets[index] = {
            ...this.tickets[index],
            ...ticket,
            gerarProtocolo:
                ticket.gerarProtocolo ?? this.tickets[index].gerarProtocolo,
        };
        return this.tickets[index];
    }
}
