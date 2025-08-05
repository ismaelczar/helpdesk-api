import { IsEnum, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@/shared/http/docs/decorators/ApiProperty";
import { TicketType } from "./TicketType";

export class CreateTicketDTO {
    @IsNotEmpty()
    @ApiProperty()
    title!: string;

    @IsEnum(TicketType)
    @ApiProperty()
    type!: TicketType;

    @IsNotEmpty()
    @ApiProperty()
    description!: string;

    @IsNotEmpty()
    @ApiProperty()
    customer_id!: string;

    @ApiProperty()
    creator_id!: string;
}
