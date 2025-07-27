import type { Customer } from "@/modules/customers/domain/entities/Customer";
import type { User } from "@/modules/users/domain/entities/User";
import { ApiProperty } from "@/shared/http/docs/decorators/ApiProperty";

export class CreateTicketResponse {
    @ApiProperty()
    id!: string;

    @ApiProperty()
    protocol!: string;

    @ApiProperty()
    title!: string;

    @ApiProperty()
    type!: string;

    @ApiProperty()
    description!: string;

    @ApiProperty()
    status!: string;

    @ApiProperty()
    resolution_notes!: string;

    @ApiProperty()
    customer_id!: string;

    @ApiProperty()
    creator_id!: string;

    @ApiProperty()
    assigned_agent_id!: string;

    @ApiProperty()
    customer!: Customer;

    @ApiProperty()
    creator!: Omit<User, "password">;
}
