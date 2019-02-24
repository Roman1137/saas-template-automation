import {configure, getLogger} from "log4js";

const consoleLogger = getLogger();
configure({
    appenders: { console: { type: 'console'} },
    categories: { default: { appenders: [ 'console' ], level: 'all' } }
});

export class ConsoleLogger {

    public static info(messageToLog: string): void {
        consoleLogger.info(messageToLog);
    }

    public static debug(messageToLog: string): void {
        consoleLogger.debug(messageToLog);
    }

    public static error(messageToLog: string): void {
        consoleLogger.error(messageToLog);
    }
}