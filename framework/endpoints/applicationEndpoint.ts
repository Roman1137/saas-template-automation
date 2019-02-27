import * as request from "superagent";
import {BaseEndpoint} from "./baseEndpoint";

export class ApplicationEndpoint extends BaseEndpoint {
    constructor() {
        const uniformResourceName = "/application.wadl";
        super(uniformResourceName);
    }

    public async getAppDescription(): Promise<request.Response> {
        return await this.sendGet();
    }
}
