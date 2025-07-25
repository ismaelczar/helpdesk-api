import "reflect-metadata";

import { registerSharedProviders } from "@/shared/container/";
import { registerRoutes } from "@/shared/http/docs/decorators/routes-loader";
import app from "./app";
import { handleError } from "./http/middlewares/handleError";

export async function bootstrap() {
    await registerSharedProviders();
    await registerRoutes(app);
    app.use(handleError);
    const port = process.env.APP_PORT || 3333;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
