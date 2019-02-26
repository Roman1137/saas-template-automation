import * as dotenv from "dotenv";
import {ConsoleLogger} from "./loggers/consoleLogger/consoleLogger";

dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || "local";
let path;
switch (process.env.NODE_ENV) {
    case "local":
        path = `${__dirname}/config/.env.local`;
        break;
    case "development":
        path = `${__dirname}/config/.env.development`;
        break;
    case "test":
        path = `${__dirname}/config/.env.test`;
        break;
    case "production":
        path = `${__dirname}/config/.env.production`;
        break;
    default:
        throw new Error("The process.env.NODE_ENV value is invalid and it is impossible to read config file");

}
dotenv.config({ path });

