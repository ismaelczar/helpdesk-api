import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Ticket } from "@/modules/tickets/domain/entities/Ticket";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    name!: string;

    @Column({ type: "varchar" })
    email!: string;

    @Column({ type: "varchar" })
    password!: string;

    @CreateDateColumn({ type: "timestamp with time zone" })
    created_at!: Date;

    @OneToMany(() => Ticket, (ticket) => ticket.creator)
    createdTickets!: Ticket[];

    @OneToMany(() => Ticket, (ticket) => ticket.assigned_agent)
    assignedTickets!: Ticket[];
}
