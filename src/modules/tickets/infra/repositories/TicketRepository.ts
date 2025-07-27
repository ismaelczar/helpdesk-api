import { inject, injectable } from "tsyringe";
import type { DataSource, Repository } from "typeorm";
import type { CreateTicketDTO } from "../../domain/dto/CreateTicketDTO";
import { Ticket } from "../../domain/entities/Ticket";
import type { ITicketsRepository } from "../../domain/repositories/ITicketRepository";

@injectable()
export class TicketsRepository implements ITicketsRepository {
    ormRepo: Repository<Ticket>;

    constructor(@inject("DataSource") dataSource: DataSource) {
        this.ormRepo = dataSource.getRepository(Ticket);
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

    async createTicket(data: CreateTicketDTO): Promise<Ticket | null> {
        const ticket = this.ormRepo.create(data);
        await this.ormRepo.save(ticket);

        return await this.ormRepo.findOne({
            where: { id: ticket.id },
            relations: ["customer", "creator"],
        });
    }
}
