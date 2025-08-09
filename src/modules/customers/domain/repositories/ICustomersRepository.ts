import type { CreateCustomerDTO } from "../dto/CreateCustomerDTO";
import type { FilterCustomerDTO } from "../dto/FilterCustomerDTO";
import type { Customer } from "../entities/Customer";

export interface ICustomersRepository {
    findById(id: string): Promise<Customer | null>;
    findByCnpj(cnpj: string): Promise<Customer | null>;
    findWithFilters(filters: FilterCustomerDTO): Promise<Customer[]>;

    createCustomer(customer: CreateCustomerDTO): Promise<Customer>;
    updateCustomer(customer: Partial<Customer>): Promise<Customer>;
}
