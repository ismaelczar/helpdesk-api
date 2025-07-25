import cors from "cors";
import express from "express";

export class App {
	private app: express.Application;

	constructor() {
		this.app = express();
		this.setupMiddlewares();
		this.getApp();
	}

	//private setupDocs(): void {}

	private setupMiddlewares(): void {
		this.app.use(express.json());
		this.app.use(cors());
	}

	getApp(): express.Application {
		return this.app;
	}
}

export default new App().getApp();
