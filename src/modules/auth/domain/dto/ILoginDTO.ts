import { IsEmail } from "class-validator";
import { ApiProperty } from "@/shared/http/docs/decorators/ApiProperty";

export class ILoginDTO {
    @IsEmail(
        {},
        {
            message: "Invalid email format",
        }
    )
    @ApiProperty()
    email!: string;

    @ApiProperty()
    password!: string;
}
