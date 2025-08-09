import { inject, injectable } from "tsyringe";
import type { FilterCustomerDTO } from "@/modules/customers/domain/dto/FilterCustomerDTO";
import type { Customer } from "@/modules/customers/domain/entities/Customer";
import type { ICustomersRepository } from "@/modules/customers/domain/repositories/ICustomersRepository";
import { getCache, setCache } from "@/shared/providers/redis/cashHelper";

@injectable()
export class GetCustomersUseCase {
    constructor(
        @inject("CustomersRepository")
        private readonly customersRepository: ICustomersRepository
    ) {}

    async execute(filters: FilterCustomerDTO): Promise<Customer[]> {
        const cacheKey = `customers-list:${JSON.stringify(filters)}`;

        const cachedCustomers = await getCache(cacheKey);

        if (cachedCustomers) return cachedCustomers;

        const customers = await this.customersRepository.findWithFilters(
            filters
        );

        await setCache(cacheKey, customers, 60 * 60 * 24);

        return customers;
    }
}
