import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";

export default new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false, // NUNCA use 'true' em produção
    logging: true,
    entities: ["src/modules/**/entities/*.{ts,js}"],
    migrations: ["src/shared/providers/typeorm/migrations/*.{ts,js}"],

    // entities: [
    //     env.NODE_ENV === "development"
    //         ? path.resolve(__dirname, "../../../../modules/**/entities/*")
    //         : path.resolve(__dirname, "../../../../modules/**/entities/*.js"),
    // ],
    // migrations: [
    //     env.NODE_ENV === "development"
    //         ? path.resolve(__dirname, "../migrations/*")
    //         : path.resolve(__dirname, "../migrations/*.js"),
    // ],
});
