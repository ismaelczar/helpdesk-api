import { inject, injectable } from "tsyringe";
import type { DataSource, Repository } from "typeorm";
import type { CreateCustomerDTO } from "../domain/dto/CreateCustomerDTO";
import { Customer } from "../domain/entities/Customer";
import type { ICustomersRepository } from "../domain/repositories/ICustomersRepository";

@injectable()
export class CustomersRepository implements ICustomersRepository {
    ormRepo: Repository<Customer>;

    constructor(@inject("DataSource") dataSource: DataSource) {
        this.ormRepo = dataSource.getRepository(Customer);
    }

    async findById(id: string): Promise<Customer | null> {
        const customer = await this.ormRepo.findOne({
            where: { id: id },
        });

        return customer;
    }

    async findByCnpj(cnpj: string): Promise<Customer | null> {
        const customer = this.ormRepo.findOne({
            where: { cnpj },
        });

        return customer;
    }

    async createCustomer(customer: CreateCustomerDTO): Promise<Customer> {
        const result = this.ormRepo.create(customer);
        await this.ormRepo.save(result);
        return result;
    }

    async updateCustomer(customer: Partial<Customer>): Promise<Customer> {
        return await this.ormRepo.save(customer);
    }
}
