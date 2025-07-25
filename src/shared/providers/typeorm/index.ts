import type { DataSource } from "typeorm";

import ormConfig from "./config/ormConfig";

export default async (): Promise<DataSource> => {
	const config = ormConfig;

	return await config.initialize();
};
