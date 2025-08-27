import type { CreateTicketHistoryDTO } from "@/modules/tickets/domain/dto/CreateTicketHistoryDTO";
import type { TicketHistory } from "@/modules/tickets/domain/entities/TicketHistory";
import type { ITicketHistoryRepository } from "@/modules/tickets/domain/repositories/ITicketHistoryRepository";

export class FakeTicketHistoryRepository implements ITicketHistoryRepository {
    private histories: TicketHistory[] = [];

    async createHistory(data: CreateTicketHistoryDTO): Promise<TicketHistory> {
        const history = {
            ...data,
            id: crypto.randomUUID(),
            created_at: new Date(),
        } as TicketHistory;

        this.histories.push(history);
        return history;
    }
}
