import path from "node:path";
import fg from "fast-glob";

export async function getAllControllers(): Promise<any[]> {
    const controllerFiles = await fg([
        "src/modules/**/useCases/**/**Controller.ts",
        "dist/modules/**/useCases/**/**Controller.js",
    ]);

    const controllers: any[] = [];

    for (const file of controllerFiles) {
        try {
            const modulePath = path.resolve(file);
            const mod = await import(modulePath);

            Object.values(mod).forEach((exported) => {
                if (typeof exported === "function") {
                    controllers.push(exported);
                }
            });
        } catch (err) {
            console.log(`❌ Erro ao carregar controller em: ${file} ${err}`);
        }
    }

    return controllers;
}
