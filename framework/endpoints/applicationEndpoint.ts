import * as request from "superagent";
import {BaseEndpoint} from "./baseEndpoint";
import {ReporterLogger} from "../../loggers";

export class ApplicationEndpoint extends BaseEndpoint {
    constructor() {
        const uniformResourceName = "/application.wadl";
        super(uniformResourceName);
    }

    public async getAppDescription(): Promise<request.Response> {
        return ReporterLogger.createStep("tratata2", async () => {
            return await this.sendGet();
        })();
        //return await this.sendGet();
    }
}
