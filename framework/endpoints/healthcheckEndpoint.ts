import {BaseEndpoint} from "./baseEndpoint";

export class HealthcheckEndpoint extends BaseEndpoint {
    public SUCCESS_TEXT_RESPONSE: string;

    constructor() {
        const uniformResourceName = "/healthcheck";
        super(uniformResourceName);
        this.SUCCESS_TEXT_RESPONSE = "live";
    }
}