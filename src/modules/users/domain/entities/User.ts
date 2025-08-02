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

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @CreateDateColumn()
    created_at!: Date;

    @OneToMany(() => Ticket, (ticket) => ticket.creator)
    createdTickets!: Ticket[];

    @OneToMany(() => Ticket, (ticket) => ticket.assigned_agent)
    assignedTickets!: Ticket[];

    @Column()
    role!: string;
}
