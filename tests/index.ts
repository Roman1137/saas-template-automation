import * as chai from "chai";
import chaiHttp = require("chai-http");
import {ConsoleLogger} from "../loggers/";

chai.use(chaiHttp);

before(() => ConsoleLogger.info(`Mocha Test Started at ${process.env.NODE_ENV} environment`));

after(() => ConsoleLogger.info("Mocha Test Finished"));

export {
    chai,
    chaiHttp,
};
export * from "../loggers";
export * from "../framework";