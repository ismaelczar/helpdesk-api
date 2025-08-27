import "reflect-metadata";
import assert from "node:assert";
import { beforeEach, describe, it } from "@jest/globals";
import { AppError } from "@/shared/core/erros/AppError";
import { makeCustomer } from "@/shared/test/factories/customerfactory";
import { FakeCustomerRepository } from "@/shared/test/fakes/FakeCustomerRepository";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

describe("CreateCustomer", () => {
    let fakeCustomerRepository: FakeCustomerRepository;
    let createCustomerUseCase: CreateCustomerUseCase;

    beforeEach(() => {
        fakeCustomerRepository = new FakeCustomerRepository();
        createCustomerUseCase = new CreateCustomerUseCase(
            fakeCustomerRepository as any
        );
    });
    it("should be able to create a new customer", async () => {
        const customer = makeCustomer();
        await createCustomerUseCase.execute(customer);

        assert.ok(customer);
        assert.equal(customer.corporate_name, "Customer test");
        assert.equal(customer.cnpj, customer.cnpj);
        assert.equal(customer.phone_number, customer.phone_number);
        assert.ok(!("password" in customer));
    });

    it("should not be able to create a new customer with same cnpj ", async () => {
        const customer = makeCustomer();
        await fakeCustomerRepository.createCustomer(customer);

        await assert.rejects(
            () => createCustomerUseCase.execute(customer),
            (error: any) => {
                assert.ok(error instanceof AppError);
                assert.equal(
                    error.message,
                    "Customer with this cnpj already exists."
                );
                return true;
            }
        );
    });
});
