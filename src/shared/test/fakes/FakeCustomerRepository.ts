import type { FilterCustomerDTO } from "@/modules/customers/domain/dto/FilterCustomerDTO";
import type { Customer } from "@/modules/customers/domain/entities/Customer";

export class FakeCustomerRepository {
    ormRepo: Customer[];

    constructor() {
        this.ormRepo = [];
    }

    // cria um cliente
    async createCustomer(customer: Customer): Promise<Customer> {
        const customerData: Customer = {
            id: customer.id,
            corporate_name: customer.corporate_name,
            cnpj: customer.cnpj,
            phone_number: customer.phone_number,
            created_at: new Date(),
            updated_at: new Date(),
            tickets: customer.tickets || [],
        };

        this.ormRepo.push(customerData);

        return customerData;
    }

    // busca por CNPJ
    async findByCnpj(cnpj: string): Promise<Customer | null> {
        return this.ormRepo.find((c) => c.cnpj === cnpj) || null;
    }

    // busca por ID (necessário para UpdateCustomerUseCase)
    async findById(id: string): Promise<Customer | null> {
        return this.ormRepo.find((c) => c.id === id) || null;
    }

    // atualiza cliente (necessário para UpdateCustomerUseCase)
    async updateCustomer(customer: Customer): Promise<void> {
        const index = this.ormRepo.findIndex((c) => c.id === customer.id);
        if (index !== -1) {
            this.ormRepo[index] = customer;
        }
    }

    // busca com filtros (necessário para GetCustomersUseCase)
    async findWithFilters(filters: FilterCustomerDTO): Promise<Customer[]> {
        if (filters.cnpj) {
            return this.ormRepo.filter((c) => c.cnpj === filters.cnpj);
        }
        return this.ormRepo;
    }
}
