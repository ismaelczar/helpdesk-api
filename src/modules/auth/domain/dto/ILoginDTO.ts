import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@/shared/http/docs/decorators/ApiProperty";

export class ILoginDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsEmail(
        {},
        {
            message: "Invalid email format",
        }
    )
    @ApiProperty()
    email!: string;
}
