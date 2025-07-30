import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Ticket } from "@/modules/tickets/domain/entities/Ticket";

export enum UserRole {
    SUPPORT = "support",
    ADMIN = "admin",
}

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

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.SUPPORT,
    })
    role!: UserRole;
}
