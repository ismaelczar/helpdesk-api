import { inject, injectable } from "tsyringe";
import type { UpdateCustomerDTO } from "@/modules/customers/domain/dto/UpdateCustomerDTO";
import type { Customer } from "@/modules/customers/domain/entities/Customer";
import type { ICustomersRepository } from "@/modules/customers/domain/repositories/ICustomersRepository";
import { AppError } from "@/shared/core/erros/AppError";

@injectable()
export class UpdateCustomerUseCase {
    constructor(
        @inject("CustomersRepository")
        private readonly customersRepository: ICustomersRepository
    ) {}
    async execute(data: UpdateCustomerDTO): Promise<Customer> {
        const customerExist = await this.customersRepository.findById(data.id);
        console.log(data.id);

        if (!customerExist)
            throw new AppError("Customer not found", 404, "business");

        const customer: Customer = {
            id: customerExist.id,
            cnpj: data.cnpj ?? customerExist.cnpj,
            corporate_name: data.corporate_name ?? customerExist.corporate_name,
            phone_number: data.phone_number ?? customerExist.phone_number,
            created_at: customerExist.created_at,
            updated_at: new Date(),
        };

        await this.customersRepository.updateCustomer(customer);

        return customer;
    }
}
