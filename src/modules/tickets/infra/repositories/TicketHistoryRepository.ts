import { inject, injectable } from "tsyringe";
import type { DataSource, Repository } from "typeorm";
import type { CreateTicketHistoryDTO } from "../../domain/dto/CreateTicketHistoryDTO";
import { TicketHistory } from "../../domain/entities/TicketHistory";
import type { ITicketHistoryRepository } from "../../domain/repositories/ITicketHistoryRepository";

@injectable()
export class TicketHistoryRepository implements ITicketHistoryRepository {
    ormRepo: Repository<TicketHistory>;

    constructor(@inject("DataSource") dataSource: DataSource) {
        this.ormRepo = dataSource.getRepository(TicketHistory);
    }

    async createHistory(
        ticket: CreateTicketHistoryDTO
    ): Promise<TicketHistory> {
        const history = this.ormRepo.create(ticket);
        await this.ormRepo.save(history);

        return history;
    }
}
