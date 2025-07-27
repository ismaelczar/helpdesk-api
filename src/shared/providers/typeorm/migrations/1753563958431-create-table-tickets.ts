import {
    type MigrationInterface,
    type QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CreateTableTickets1753563958431 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tickets",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "protocol",
                        type: "varchar",
                    },
                    {
                        name: "title",
                        type: "varchar",
                    },
                    {
                        name: "type",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "status",
                        type: "varchar",
                    },
                    {
                        name: "resolution_notes",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "customer_id",
                        type: "int",
                    },
                    {
                        name: "creator_id",
                        type: "int",
                    },
                    {
                        name: "assigned_agent_id",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "customer",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "tickets",
            new TableForeignKey({
                columnNames: ["customer_id"],
                referencedTableName: "customers",
                referencedColumnNames: ["id"],
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "tickets",
            new TableForeignKey({
                columnNames: ["creator_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "tickets",
            new TableForeignKey({
                columnNames: ["assigned_agent_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("tickets");

        if (table) {
            const customerFk = table.foreignKeys.find((fk) =>
                fk.columnNames.includes("customer_id")
            );
            if (customerFk) {
                await queryRunner.dropForeignKey("tickets", customerFk);
            }

            const creatorFk = table.foreignKeys.find((fk) =>
                fk.columnNames.includes("creator_id")
            );
            if (creatorFk) {
                await queryRunner.dropForeignKey("tickets", creatorFk);
            }

            const agentFk = table.foreignKeys.find((fk) =>
                fk.columnNames.includes("assigned_agent_id")
            );
            if (agentFk) {
                await queryRunner.dropForeignKey("tickets", agentFk);
            }
        }
        await queryRunner.dropTable("tickets");
    }
}
