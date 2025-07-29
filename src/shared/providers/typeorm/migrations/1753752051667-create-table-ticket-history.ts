import {
    type MigrationInterface,
    type QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CreateTableTicketHistory1753752051667
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "ticket_history",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "ticket_id",
                        type: "int",
                    },
                    {
                        name: "user_id",
                        type: "varchar",
                    },
                    {
                        name: "action",
                        type: "varchar",
                    },
                    {
                        name: "details",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "ticket_history",
            new TableForeignKey({
                columnNames: ["ticket_id"],
                referencedTableName: "tickets",
                referencedColumnNames: ["id"],
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("ticket_history");

        if (table) {
            const ticketFk = table.foreignKeys.find((fk) =>
                fk.columnNames.includes("ticket_id")
            );
            if (ticketFk) {
                await queryRunner.dropForeignKey("ticket_history", ticketFk);
            }
        }
        await queryRunner.dropTable("ticket_history");
    }
}
