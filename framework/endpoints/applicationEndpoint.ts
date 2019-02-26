import {BaseEndpoint} from "./baseEndpoint";

export class ApplicationEndpoint extends BaseEndpoint {
    constructor() {
        const uniformResourceName = "/application.wadl";
        super(uniformResourceName);
    }
}