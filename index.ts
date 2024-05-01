import express, { Application } from "express";

import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { initalizeSlackBots } from "./src/controllers/slack";
import path from "path";
import setRoutes from "./src/routes";

dotenv.config();

declare global {
	var server: any;
}

//Express Initialization
const port = process.env.PORT || 3000;
// Initialize express application
const server: Application = express();
/**
 * Middlewares
 */
server.use(compression());
server.use(cookieParser());
server.use(cors());
server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(helmet());
server.use(helmet.noSniff());
server.use(helmet.xssFilter());
server.use(helmet.frameguard());
/**
 * CORS Configuration
 */
server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

setRoutes(server);
initalizeSlackBots();

server.listen(port, () => console.info(`Worker Process started on Port: ${port} || PID: ${process.pid}`));

process.on("beforeExit", async (signal) => {
	console.error(`Worked PID: ${process.pid}, before exited on signal: ${signal}`);
});
process.on("exit", (signal) => {
	console.error(`Worked PID: ${process.pid}, exited on signal: ${signal}`);
	// Cleanup logic can be placed here
});

process.on("SIGINT", () => {
	process.exit();
	// Cleanup logic can be placed here
});

process.on("SIGTERM", () => {
	process.exit();
	// Cleanup logic can be placed here
});

process.on("uncaughtException", (err) => {
	process.exit();
	// Cleanup logic can be placed here
});

process.setMaxListeners(100);
global.server = server;
