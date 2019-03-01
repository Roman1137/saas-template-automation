import {Response} from "superagent";
import {ConsoleLogger, ReporterLogger} from "..";
import {IContentType} from "../../framework/models";

export class HttpResuestsLogger {
    public static LogRequest(methodType: string, url: string, body: string, contentType: IContentType) {
        const textForLogging = `Sending ${methodType} request.
                            Url: ${url}
                            Body: ${body}
                            ContentType: ${contentType.value}`;

        ConsoleLogger.info(textForLogging);

        ReporterLogger.createStep(`Sending ${methodType} Request.`, () => {
            ReporterLogger.createAttachment("RequestInfo:", textForLogging);
        })();
    }

    public static LogResponse(responseText: Response) {
        ConsoleLogger.info(`Response: ${responseText}`);

        ReporterLogger.createStep("Response was received.", () => {
            ReporterLogger.createAttachment("Response:", JSON.stringify(responseText, null, "\t"));
        })();
    }
}