import type { Request, Response } from "express";
import { container } from "tsyringe";
import { ensureAdmin } from "@/main/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@/main/http/middlewares/ensureAuthenticated";
import { CreateCustomerDTO } from "@/modules/customers/domain/dto/CreateCustomerDTO";
import { ApiResponse } from "@/shared/http/docs/decorators/ApiResponse";
import { Body } from "@/shared/http/docs/decorators/Body";
import { Controller } from "@/shared/http/docs/decorators/Controller";
import { Post } from "@/shared/http/docs/decorators/methods/Post";
import { UseMiddleware } from "@/shared/http/docs/decorators/UseMiddleware";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

@Controller("/customers")
export class CreateCustomerController {
    @Post("/")
    @ApiResponse({
        statusCode: 201,
        dtoClass: CreateCustomerDTO,
        description: "Customer created successfully",
    })
    @UseMiddleware(ensureAuthenticated, ensureAdmin)
    @Body(CreateCustomerDTO)
    async handle(req: Request, res: Response): Promise<Response> {
        const customer = req.body;

        const useCase = container.resolve(CreateCustomerUseCase);
        const response = await useCase.execute(customer);

        return res.status(201).json(response as CreateCustomerDTO);
    }
}
