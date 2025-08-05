import { IsEmail, IsIn, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@/shared/http/docs/decorators/ApiProperty";

export class CreateUserDTO {
    @IsNotEmpty()
    @ApiProperty()
    name!: string;

    @IsEmail(
        {},
        {
            message: "Invalid email format",
        }
    )
    @ApiProperty()
    email!: string;

    @MinLength(6, {
        message: "Password must be at least 6 characters long",
    })
    @ApiProperty()
    password!: string;

    @IsNotEmpty()
    @IsIn(["admin", "support", "owner"])
    @ApiProperty()
    role!: "admin" | "suport" | "owner";
}
