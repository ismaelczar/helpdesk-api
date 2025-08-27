import { randomUUID } from "node:crypto";
import type { Customer } from "@/modules/customers/domain/entities/Customer";

export function makeCustomer(ovverrides?: Partial<Customer>): Customer {
    return {
        id: randomUUID(),
        corporate_name: "Customer test",
        cnpj: "00.000.00/0001-01",
        phone_number: "+5500987654321",
        created_at: new Date(),
        updated_at: new Date(),
        tickets: [],
        ...ovverrides,
    };
}
