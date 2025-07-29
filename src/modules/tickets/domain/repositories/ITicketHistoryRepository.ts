import type { CreateTicketHistoryDTO } from "../dto/CreateTicketHistoryDTO";
import type { TicketHistory } from "../entities/TicketHistory";

export interface ITicketHistoryRepository {
    createHistory(ticket: CreateTicketHistoryDTO): Promise<TicketHistory>;
}
