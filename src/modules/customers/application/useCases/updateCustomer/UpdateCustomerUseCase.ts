import { inject, injectable } from "tsyringe";
import type { UpdateCustomerDTO } from "@/modules/customers/domain/dto/UpdateCustomerDTO";
import type { Customer } from "@/modules/customers/domain/entities/Customer";
import type { ICustomersRepository } from "@/modules/customers/domain/repositories/ICustomersRepository";
import type { IUsersRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { AppError } from "@/shared/core/erros/AppError";

@injectable()
export class UpdateCustomerUseCase {
    constructor(
        @inject("CustomersRepository")
        private readonly customersRepository: ICustomersRepository,

        @inject("UsersRepository")
        private readonly usersRepository: IUsersRepository
    ) {}
    async execute(
        data: UpdateCustomerDTO,
        userData: string
    ): Promise<Customer> {
        const customerExist = await this.customersRepository.findById(data.id);

        if (!customerExist)
            throw new AppError("Customer not found", 404, "business");

        const user = await this.usersRepository.findByEmail(userData);

        if (user?.role !== "admin")
            throw new AppError("User not authorized", 403, "business");

        const customer: Customer = {
            id: customerExist.id,
            cnpj: data.cnpj ?? customerExist.cnpj,
            corporate_name: data.corporate_name ?? customerExist.corporate_name,
            phone_number: data.phone_number ?? customerExist.phone_number,
            created_at: customerExist.created_at,
            updated_at: new Date(),
            tickets: customerExist.tickets,
        };

        await this.customersRepository.updateCustomer(customer);

        return customer;
    }
}
