import { type MigrationInterface, type QueryRunner, Table } from "typeorm";

export class CreateTableCustomers1753535560827 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "customers",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "corporate_name",
                        type: "varchar",
                    },
                    {
                        name: "cnpj",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "phone_number",
                        type: "varchar",
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("customers");
    }
}
