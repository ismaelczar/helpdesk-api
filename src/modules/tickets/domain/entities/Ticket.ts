import { customAlphabet } from "nanoid";
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "@/modules/customers/domain/entities/Customer";
import { User } from "@/modules/users/domain/entities/User";

const gerarId = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);

@Entity("tickets")
export class Ticket {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    protocol!: string;

    @Column()
    title!: string;

    @Column()
    type!: string;

    @Column()
    description!: string;

    @Column()
    status!: string;

    @Column()
    resolution_notes!: string;

    @Column()
    customer_id!: string;

    @ManyToOne(() => Customer, (customer) => customer.tickets)
    @JoinColumn({ name: "customer_id" })
    customer!: Customer;

    @Column()
    creator_id!: string;

    @ManyToOne(() => User, (customer) => customer.createdTickets)
    @JoinColumn({ name: "creator_id" })
    creator!: User;

    @Column()
    assigned_agent_id!: string;

    @ManyToOne(() => User, (assigned_agent) => assigned_agent)
    @JoinColumn({ name: "assigned_agent_id" })
    assigned_agent!: User;

    @CreateDateColumn()
    created_at!: Date;

    @CreateDateColumn()
    updated_at!: Date;

    @BeforeInsert()
    gerarProtocolo() {
        this.protocol = `CHAM-${gerarId()}`;
    }
}
