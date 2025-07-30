import {
    type MigrationInterface,
    type QueryRunner,
    TableColumn,
} from "typeorm";

export class AddRoleColumnToUsers1753830562841 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "role",
                type: "varchar",
                isNullable: false,
                default: "'support'",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "role");
    }
}
