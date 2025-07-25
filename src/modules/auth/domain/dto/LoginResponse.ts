import { ApiProperty } from "@/shared/http/docs/decorators/ApiProperty";

export class LoginResponse {
    @ApiProperty()
    token!: string;

    @ApiProperty()
    refreshToken!: string;
}
