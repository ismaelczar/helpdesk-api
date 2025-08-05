import type { Request, Response } from "express";
import { container } from "tsyringe";
import { ensureAuthenticated } from "@/main/http/middlewares/ensureAuthenticated";
import { Controller } from "@/shared/http/docs/decorators/Controller";
import { Get } from "@/shared/http/docs/decorators/methods/Get";
import { UseMiddleware } from "@/shared/http/docs/decorators/UseMiddleware";
import { GetDashboardSummaryUseCase } from "./GetDashboardSummaryUseCase";

@Controller("/admin")
export class GetDashboardSummaryController {
    @Get("/dashboard")
    @UseMiddleware(ensureAuthenticated)
    //  TODO: CRIAR ENSUREOWNER
    async handle(req: Request, res: Response): Promise<Response> {
        const useCase = container.resolve(GetDashboardSummaryUseCase);

        const response = await useCase.execute();
        return res.status(200).json(response);
    }
}
