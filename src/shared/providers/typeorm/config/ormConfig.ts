import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";
import path from "node:path";
import env from "@/config/env";

export default new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [
        env.NODE_ENV === "development"
            ? path.resolve(__dirname, "../../../../modules/**/entities/*")
            : path.resolve(__dirname, "../../../../modules/**/entities/*.js"),
    ],
    migrations: [
        env.NODE_ENV === "development"
            ? path.resolve(__dirname, "../migrations/*")
            : path.resolve(__dirname, "../migrations/*.js"),
    ],
});
