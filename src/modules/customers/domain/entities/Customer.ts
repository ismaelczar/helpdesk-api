import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("customers")
export class Customer {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    corporate_name!: string;

    @Column({ type: "varchar" })
    cnpj!: string;

    @Column({ type: "varchar" })
    phone_number!: string;

    @CreateDateColumn({ type: "timestamp with time zone" })
    created_at!: Date;

    @CreateDateColumn({ type: "timestamp with time zone" })
    updated_at!: Date;
}
