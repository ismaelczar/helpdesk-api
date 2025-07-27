import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@/shared/http/docs/decorators/ApiProperty";

export class CreateTicketDTO {
    @IsNotEmpty()
    @ApiProperty()
    title!: string;

    @IsNotEmpty()
    @ApiProperty()
    type!: string;

    @IsNotEmpty()
    @ApiProperty()
    description!: string;

    @IsNotEmpty()
    @ApiProperty()
    status!: string;

    @IsNotEmpty()
    @ApiProperty()
    customer_id!: string;

    @ApiProperty()
    creator_id!: string;
}
