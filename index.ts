//https://github.com/mochajs/mocha/issues/2507 info how to set global hook
import {ConsoleLogger} from "./loggers/consoleLogger/consoleLogger";

//TODO write info about env where tests will be run
before(() => ConsoleLogger.info("Mocha Test Started"));
after(() => ConsoleLogger.info("Mocha Test Finished"));