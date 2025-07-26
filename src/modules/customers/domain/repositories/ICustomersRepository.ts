import type { CreateCustomerDTO } from "../dto/CreateCustomerDTO";
import type { Customer } from "../entities/Customer";

export interface ICustomersRepository {
    findById(id: string): Promise<Customer | null>;
    findByCnpj(cnpj: string): Promise<Customer | null>;

    createCustomer(customer: CreateCustomerDTO): Promise<Customer>;
    updateCustomer(customer: Partial<Customer>): Promise<Customer>;
}
