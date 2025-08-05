import { inject, injectable } from "tsyringe";
import type { DataSource, Repository } from "typeorm";
import type { CreateTicketDTO } from "../../domain/dto/CreateTicketDTO";
import type { FilterTicketsDTO } from "../../domain/dto/FilterTicketsDTO";
import { Ticket } from "../../domain/entities/Ticket";
import type { ITicketsRepository } from "../../domain/repositories/ITicketRepository";

@injectable()
export class TicketsRepository implements ITicketsRepository {
    ormRepo: Repository<Ticket>;

    constructor(@inject("DataSource") dataSource: DataSource) {
        this.ormRepo = dataSource.getRepository(Ticket);
    }

    async findAll(): Promise<Ticket[]> {
        const tickets = await this.ormRepo.find({
            relations: ["customer", "assigned_agent"],
        });

        return tickets;
    }

    async findById(id: string): Promise<Ticket | null> {
        const ticket = await this.ormRepo.findOne({
            where: { id: id },
        });

        return ticket;
    }

    async findDuplicatedOpenTicket(
        type: string,
        customer_id: string,
        status: string
    ): Promise<Ticket | null> {
        const ticket = await this.ormRepo.findOne({
            where: { type, customer_id, status },
        });

        return ticket;
    }

    async findWithFilters(filters: FilterTicketsDTO): Promise<Ticket[]> {
        const query = this.ormRepo
            .createQueryBuilder("ticket")
            .leftJoinAndSelect("ticket.customer", "customer")
            .leftJoinAndSelect("ticket.assigned_agent", "assigned_agent");

        if (filters.status) {
            query.andWhere("ticket.status = :status", {
                status: filters.status,
            });
        }

        if (filters.type) {
            query.andWhere("ticket.type = :type", { type: filters.type });
        }

        if (filters.protocol) {
            query.andWhere("ticket.protocol = :protocol", {
                protocol: filters.protocol,
            });
        }

        if (filters.customer_id) {
            query.andWhere("ticket.customer_id = :customer_id", {
                customer_id: filters.customer_id,
            });
        }

        if (filters.created_from) {
            query.andWhere("ticket.created_from >= :from", {
                from: filters.created_from,
            });
        }

        if (filters.created_to) {
            query.andWhere("ticket.created_at <= :to", {
                to: filters.created_to,
            });
        }

        // Opcional: ordenação
        query.orderBy("ticket.created_at", "DESC");

        return await query.getMany();
    }

    async findByStatus(): Promise<Ticket[]> {
        const result = await this.ormRepo
            .createQueryBuilder("ticket")
            .select("ticket.status", "status")
            .addSelect("COUNT(*)", "count")
            .groupBy("ticket.status")
            .getRawMany();

        return result;
    }

    async findByType(): Promise<Ticket[]> {
        const result = await this.ormRepo
            .createQueryBuilder("ticket")
            .select("ticket.type", "type")
            .addSelect("COUNT(*)", "count")
            .groupBy("ticket.type")
            .getRawMany();

        return result;
    }

    async findOpenByAgent(): Promise<Ticket[]> {
        const result = await this.ormRepo
            .createQueryBuilder("ticket")
            .leftJoin("ticket.assigned_agent", "agent")
            .select("agent.name", "agentName")
            .addSelect("COUNT(*)", "count")
            .where("ticket.status != 'closed'")
            .groupBy("agent.id")
            .addGroupBy("agent.name")
            .getRawMany();

        return result;
    }

    async findCloseByAgent(): Promise<Ticket[]> {
        const result = await this.ormRepo
            .createQueryBuilder("ticket")
            .leftJoin("ticket.assigned_agent", "agent")
            .select("agent.name", "agentName")
            .addSelect("COUNT(*)", "count")
            .where("ticket.status != 'open'")
            .groupBy("agent.id")
            .addGroupBy("agent.name")
            .getRawMany();

        return result;
    }

    async createTicket(data: CreateTicketDTO): Promise<Ticket | null> {
        const ticket = this.ormRepo.create(data);
        await this.ormRepo.save(ticket);

        return await this.ormRepo.findOne({
            where: { id: ticket.id },
            relations: ["customer", "creator"],
        });
    }

    async updateTicket(ticket: Partial<Ticket>): Promise<Ticket> {
        return await this.ormRepo.save(ticket);
    }
}
