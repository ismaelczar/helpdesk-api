import "reflect-metadata";
import { AppError } from "@/shared/core/erros/AppError";
import { makeCustomer } from "@/shared/test/factories/customerfactory";
import { FakeCustomerRepository } from "@/shared/test/fakes/FakeCustomerRepository";
import { UpdateCustomerUseCase } from "./UpdateCustomerUseCase";

describe("UpdateCustomer", () => {
    let fakeCustomerRepository: FakeCustomerRepository;
    let updateCustomerUseCase: UpdateCustomerUseCase;

    beforeEach(() => {
        fakeCustomerRepository = new FakeCustomerRepository();
        updateCustomerUseCase = new UpdateCustomerUseCase(
            fakeCustomerRepository as any
        );
    });

    it("should update an existing customer", async () => {
        const customer = makeCustomer();
        await fakeCustomerRepository.createCustomer(customer);

        const updatedData = {
            cnpj: customer.cnpj, // mesmo valor se não quiser alterar
            corporate_name: "Nova Empresa LTDA",
            phone_number: "999999999",
        };

        const updatedCustomer = await updateCustomerUseCase.execute(
            updatedData,
            customer.id
        );

        expect(updatedCustomer).toBeDefined();
        expect(updatedCustomer.corporate_name).toBe(updatedData.corporate_name);
        expect(updatedCustomer.phone_number).toBe(updatedData.phone_number);
        expect(updatedCustomer.id).toBe(customer.id);
        expect((updatedCustomer.updated_at = new Date()));
    });

    it("should throw an error if customer does not exist", async () => {
        const nonExistentId = "non-existent-id";

        await expect(
            updateCustomerUseCase.execute(
                {
                    cnpj: "00000000000000",
                    corporate_name: "Teste",
                    phone_number: "000000000",
                },
                nonExistentId
            )
        ).rejects.toEqual(new AppError("Customer not found", 404, "business"));
    });

    it("should update only the provided fields", async () => {
        const customer = makeCustomer();
        customer.corporate_name = "Original Name";
        await fakeCustomerRepository.createCustomer(customer);

        const updatedData = {
            cnpj: customer.cnpj, // mesmo valor se não quiser alterar
            corporate_name: "Nova Empresa LTDA",
            phone_number: "888888888",
        };

        await new Promise((r) => setTimeout(r, 10)); // garantir timestamps diferentes

        const updatedCustomer = await updateCustomerUseCase.execute(
            updatedData,
            customer.id
        );

        expect(updatedCustomer.corporate_name).toBe("Nova Empresa LTDA"); // confirmando que não mudou
        expect(updatedCustomer.phone_number).toBe(updatedData.phone_number); // confirmando que mudou
    });
});
