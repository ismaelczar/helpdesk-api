import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Ticket } from "./Ticket";

@Entity("ticket_history")
export class TicketHistory {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    ticket_id!: string;

    @ManyToOne(() => Ticket, (ticket) => ticket.ticket_history)
    @JoinColumn({ name: "ticket_id" })
    ticket!: Ticket;

    @Column()
    user_id!: string;

    @Column()
    action!: string;

    @Column()
    details!: string;

    @CreateDateColumn()
    created_at!: Date;
}
