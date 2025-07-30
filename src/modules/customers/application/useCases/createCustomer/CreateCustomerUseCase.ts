import { inject, injectable } from "tsyringe";
import type { CreateCustomerDTO } from "@/modules/customers/domain/dto/CreateCustomerDTO";
import type { Customer } from "@/modules/customers/domain/entities/Customer";
import type { ICustomersRepository } from "@/modules/customers/domain/repositories/ICustomersRepository";
import type { IUsersRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { AppError } from "@/shared/core/erros/AppError";

@injectable()
export class CreateCustomerUseCase {
    constructor(
        @inject("CustomersRepository")
        private readonly customersRepository: ICustomersRepository,

        @inject("UsersRepository")
        private readonly usersRepository: IUsersRepository
    ) {}

    async execute(
        customer: CreateCustomerDTO,
        userData: string
    ): Promise<Customer> {
        const user = await this.usersRepository.findByEmail(userData);

        if (user?.role !== "admin")
            throw new AppError("User not authorized", 403, "business");

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
