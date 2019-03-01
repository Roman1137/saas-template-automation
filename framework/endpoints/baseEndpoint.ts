import * as chai from "chai";
import * as request from "superagent";
import {
    ContentType,
    IContentType,
    String,
} from "../index";
import {HttpResuestsLogger} from "../../loggers/httpRequestsLogger/httpResuestsLogger";

export class BaseEndpoint {

    public static get contentTypeJson(): IContentType {
        return {name: "Content-Type", value: ContentType.APPLICATION_JSON} as IContentType;
    }

    public static get contentTypeWadlXml(): IContentType {
        return {name: "Content-Type", value: ContentType.WADL_XML} as IContentType;
    }

    constructor(public baseUrn: string) {
    }

    public async sendGet(additionalUrn: string = String.Empty,
                         contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {

        const url = process.env.SAAS_TEMPLATE_LOCAL + this.baseUrn + additionalUrn;
        HttpResuestsLogger.LogRequest("GET", url, undefined, contentType);

        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .get(this.baseUrn + additionalUrn)
            .set(contentType.name, contentType.value)
            .send()
            .then((response) => {
                HttpResuestsLogger.LogResponse(response);
                return response;
            });
    }

    public async sendPost(additionalUrn: string = String.Empty,
                          body?: string,
                          contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {

        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .post(this.baseUrn)
            .set(contentType.name, contentType.value)
            .send(body);
    }

    public async sendPut(additionalUrn: string = String.Empty,
                         body?: string,
                         contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {

        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .put(this.baseUrn + additionalUrn)
            .set(contentType.name, contentType.value)
            .send(body);
    }

    public async sendPatch(additionalUrn: string = String.Empty,
                           body?: string,
                           contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .patch(this.baseUrn + additionalUrn)
            .set(contentType.name, contentType.value)
            .send(body);
    }

    public async sendDelete(additionalUrn: string = String.Empty,
                            contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .delete(this.baseUrn + additionalUrn)
            .set(contentType.name, contentType.value)
            .send();
    }

    public async sendOptions(additionalUrn: string = String.Empty,
                             contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .options(this.baseUrn + additionalUrn)
            .set(contentType.name, contentType.value)
            .send();
    }

    public async sendHead(additionalUrn: string = String.Empty,
                          contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .head(this.baseUrn + additionalUrn)
            .set(contentType.name, contentType.value)
            .send();
    }

    public async sendTrace(additionalUrn: string = String.Empty,
                           contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .trace(this.baseUrn + additionalUrn)
            .set(contentType.name, contentType.value)
            .send();
    }
}
