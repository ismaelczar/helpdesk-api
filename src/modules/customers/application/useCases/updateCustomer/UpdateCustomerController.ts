import type { Request, Response } from "express";
import { container } from "tsyringe";
import { ensureAuthenticated } from "@/main/http/middlewares/ensureAuthenticated";
import { UpdateCustomerDTO } from "@/modules/customers/domain/dto/UpdateCustomerDTO";
import { ApiResponse } from "@/shared/http/docs/decorators/ApiResponse";
import { Body } from "@/shared/http/docs/decorators/Body";
import { Controller } from "@/shared/http/docs/decorators/Controller";
import { Put } from "@/shared/http/docs/decorators/methods/Put";
import { UseMiddleware } from "@/shared/http/docs/decorators/UseMiddleware";
import { UpdateCustomerUseCase } from "./UpdateCustomerUseCase";

@Controller("/customers")
export class UpdateCustomerController {
    @Put("/")
    @ApiResponse({
        statusCode: 200,
        dtoClass: UpdateCustomerDTO,
        description: "Cliente atualizado com sucesso",
    })
    @Body(UpdateCustomerDTO)
    @UseMiddleware(ensureAuthenticated)
    async handle(req: Request, res: Response): Promise<Response> {
        // biome-ignore lint/style/noNonNullAssertion: <token>
        const userData = req.user?.email!;
        const data = req.body;
        const useCase = container.resolve(UpdateCustomerUseCase);
        const response = await useCase.execute(data, userData);

        return res.status(200).json(response as UpdateCustomerDTO);
    }
}
