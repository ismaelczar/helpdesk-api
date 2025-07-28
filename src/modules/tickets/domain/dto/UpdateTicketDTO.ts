import { IsIn, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@/shared/http/docs/decorators/ApiProperty";

export class UpdateTicketDTO {
    @IsNotEmpty()
    @IsIn(["open", "in_progress", "closed", "pending"])
    @ApiProperty()
    status!: "open" | "in_progress" | "closed" | "pending";

    @ApiProperty()
    resolution_notes!: string;
}
