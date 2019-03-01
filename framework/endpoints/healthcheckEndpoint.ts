import {BaseEndpoint} from "./baseEndpoint";
import * as request from "superagent";
import {ReporterLogger} from "../../loggers";

export class HealthcheckEndpoint extends BaseEndpoint {
    public SUCCESS_TEXT_RESPONSE: string;

    constructor() {
        const uniformResourceName = "/healthcheck";
        super(uniformResourceName);
        this.SUCCESS_TEXT_RESPONSE = "live";
    }

    public async performHealthCheck(): Promise<request.Response> {
        return ReporterLogger.createStep(`Performing healthcheck`, async () => {
            return await this.sendGet();
        })();
    }
}