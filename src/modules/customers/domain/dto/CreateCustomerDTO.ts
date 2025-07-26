import { IsNotEmpty, IsPhoneNumber } from "class-validator";
import { ApiProperty } from "@/shared/http/docs/decorators/ApiProperty";

export class CreateCustomerDTO {
    @IsNotEmpty()
    @ApiProperty()
    corporate_name!: string;

    @IsNotEmpty()
    @ApiProperty()
    cnpj!: string;

    @IsPhoneNumber("BR", {
        message: "O formato do número está inválido, formato: +5500987654321",
    })
    @ApiProperty()
    phone_number!: string;
}
