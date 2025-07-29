import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@/shared/http/docs/decorators/ApiProperty";

export class CreateTicketHistoryDTO {
    @IsNotEmpty()
    @ApiProperty()
    ticket_id!: string;

    @IsNotEmpty()
    @ApiProperty()
    user_id!: string;

    @IsNotEmpty()
    @ApiProperty()
    action!: string;

    @IsNotEmpty()
    @ApiProperty()
    details!: string;
}
