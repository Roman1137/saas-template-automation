import {configure, getLogger, Logger} from "log4js";
import {IAllure} from "./allureTypes/IAllure";
declare const allure: IAllure;

const logger = getLogger();
logger.level = 'debug';
logger.debug("Some debug messages");

configure({
    appenders: { console: { type: 'console'} },
    categories: { default: { appenders: [ 'console' ], level: 'all' } }
});

export class CommonLogger {
    private logger: Logger;

    constructor() {
        this.logger = logger;
    }

    public info(messageToLog: string): void {
        this.logger.info(messageToLog);
        allure.createAttachment("some info", messageToLog);
    }
}