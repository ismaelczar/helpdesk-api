import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

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
}
