import { container } from "tsyringe";
import type { DataSource } from "typeorm";
import type { ICustomersRepository } from "@/modules/customers/domain/repositories/ICustomersRepository";
import { CustomersRepository } from "@/modules/customers/infra/CustomersRepository";
import type { ITicketHistoryRepository } from "@/modules/tickets/domain/repositories/ITicketHistoryRepository";
import type { ITicketsRepository } from "@/modules/tickets/domain/repositories/ITicketRepository";
import { TicketHistoryRepository } from "@/modules/tickets/infra/repositories/TicketHistoryRepository";
import { TicketsRepository } from "@/modules/tickets/infra/repositories/TicketRepository";
import type { IUsersRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { UsersRepository } from "@/modules/users/infra/repositories/UserRepository";
import AppDataSource from "../providers/typeorm/index";

export async function registerSharedProviders(): Promise<void> {
    const dataSource: DataSource = await AppDataSource();

    container.registerInstance<DataSource>("DataSource", dataSource);

    container.registerSingleton<IUsersRepository>(
        "UsersRepository",
        UsersRepository
    );

    container.registerSingleton<ICustomersRepository>(
        "CustomersRepository",
        CustomersRepository
    );

    container.registerSingleton<ITicketsRepository>(
        "TicketsRepository",
        TicketsRepository
    );

    container.registerSingleton<ITicketHistoryRepository>(
        "TicketHistoryRepository",
        TicketHistoryRepository
    );
}
