import type { Request, Response } from "express";
import { container } from "tsyringe";
import { ensureAuthenticated } from "@/main/http/middlewares/ensureAuthenticated";
import { Controller } from "@/shared/http/docs/decorators/Controller";
import { Get } from "@/shared/http/docs/decorators/methods/Get";
import { UseMiddleware } from "@/shared/http/docs/decorators/UseMiddleware";
import { GetTicketsUseCase } from "./GetTicketsUseCase";

@Controller("/tickets")
export class GetTicketsController {
    @Get("/")
    @UseMiddleware(ensureAuthenticated)
    async handle(req: Request, res: Response): Promise<Response> {
        const useCase = container.resolve(GetTicketsUseCase);

        const {
            status,
            type,
            protocol,
            customer_id,
            created_from,
            created_to,
        } = req.query;

        const response = await useCase.execute({
            status: status?.toString(),
            type: type?.toString(),
            protocol: protocol?.toString(),
            customer_id: customer_id?.toString(),
            created_from: created_from
                ? new Date(created_from.toString())
                : undefined,
            created_to: created_to
                ? new Date(created_to.toString())
                : undefined,
        });

        return res.status(200).json(response);
    }
}
