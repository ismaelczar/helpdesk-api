import type { Request, Response } from "express";
import { container } from "tsyringe";
import { ensureAuthenticated } from "@/main/http/middlewares/ensureAuthenticated";
import { Controller } from "@/shared/http/docs/decorators/Controller";
import { Get } from "@/shared/http/docs/decorators/methods/Get";
import { UseMiddleware } from "@/shared/http/docs/decorators/UseMiddleware";
import { GetCustomersUseCase } from "./GetCustomersUseCase";

@Controller("/customers")
export class GetCustommersController {
    @Get("/")
    @UseMiddleware(ensureAuthenticated)
    async handle(req: Request, res: Response): Promise<Response> {
        const useCase = container.resolve(GetCustomersUseCase);

        const { cnpj, corporate_name } = req.query;

        const response = await useCase.execute({
            cnpj: cnpj?.toString(),
            corporate_name: corporate_name?.toString(),
        });

        return res.status(200).json(response);
    }
}
