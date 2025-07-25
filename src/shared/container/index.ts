import { container } from "tsyringe";
import type { DataSource } from "typeorm";
import type { IUserRepository } from "../../modules/users/domain/repositories/IUserRepository";
import { UserRepository } from "../../modules/users/infra/repositories/UserRepository";
import AppDataSource from "../providers/typeorm/index";

export async function registerSharedProviders(): Promise<void> {
	const dataSource: DataSource = await AppDataSource();

	container.registerInstance<DataSource>("DataSource", dataSource);

	container.registerSingleton<IUserRepository>(
		"UserRepository",
		UserRepository,
	);
}
