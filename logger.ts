import {configure, getLogger, Logger} from "log4js";
import {IAllure} from "./allureTypes/IAllure";
declare const allure: IAllure;

export class CommonLogger {

    private static configureLog4js() {
        configure({
            appenders: { console: { type: 'console'} },
            categories: { default: { appenders: [ 'console' ], level: 'all' } }
        });
    }

    private logger: Logger;

    constructor() {
        const logger = getLogger();
        CommonLogger.configureLog4js();

        this.logger = logger;
    }

    public info(messageToLog: string): void {
        this.logger.debug(messageToLog);
        allure.createAttachment("some info", messageToLog);
    }
}