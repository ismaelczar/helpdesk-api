import "reflect-metadata";

jest.mock("@/shared/providers/redis/cashHelper", () => ({
    getCache: jest.fn().mockResolvedValue(null),
    setCache: jest.fn().mockResolvedValue(undefined),
}));

import { makeCustomer } from "@/shared/test/factories/customerfactory";
import { FakeCustomerRepository } from "@/shared/test/fakes/FakeCustomerRepository";
import { GetCustomersUseCase } from "./GetCustomersUseCase";

describe("GetCustomers", () => {
    let fakeCustomerRepository: FakeCustomerRepository;
    let getCustomersUseCase: GetCustomersUseCase;

    beforeEach(() => {
        fakeCustomerRepository = new FakeCustomerRepository();
        getCustomersUseCase = new GetCustomersUseCase(
            fakeCustomerRepository as any
        );
    });

    it("should get all customers", async () => {
        const customer = makeCustomer();
        await fakeCustomerRepository.createCustomer(customer);

        const customers = await getCustomersUseCase.execute({
            cnpj: customer.cnpj,
        });

        expect(customers).toBeInstanceOf(Array);
        expect(customers.length).toBe(1);
        expect(customers[0].cnpj).toBe(customer.cnpj);
    });
});
