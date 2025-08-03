import { IsEnum } from "class-validator";
import { ApiProperty } from "@/shared/http/docs/decorators/ApiProperty";
import { StatusType } from "./StatusType";

export class UpdateTicketDTO {
    @IsEnum(StatusType)
    @ApiProperty()
    status!: StatusType;

    @ApiProperty()
    resolution_notes!: string;
}
