import { inject, injectable } from "tsyringe";
import type { CreateCustomerDTO } from "@/modules/customers/domain/dto/CreateCustomerDTO";
import type { Customer } from "@/modules/customers/domain/entities/Customer";
import type { ICustomersRepository } from "@/modules/customers/domain/repositories/ICustomersRepository";
import { AppError } from "@/shared/core/erros/AppError";

@injectable()
export class CreateCustomerUseCase {
    constructor(
        @inject("CustomersRepository")
        private readonly customersRepository: ICustomersRepository
    ) {}

    async execute(customer: CreateCustomerDTO): Promise<Customer> {
        const customerExist = await this.customersRepository.findByCnpj(
            customer.cnpj
        );

        if (customerExist)
            throw new AppError(
                "Customer with this cnpj already exists.",
                409,
                "validation"
            );

        return this.customersRepository.createCustomer(customer);
    }
}
