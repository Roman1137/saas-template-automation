import * as chai from "chai";
import * as request from "superagent";
import {
    ContentType,
    IContentType,
} from "../index";

export class BaseEndpoint {

    private static get contentTypeJson(): IContentType {
        return {name: "Content-Type", value: ContentType.APPLICATION_JSON} as IContentType;
    }

    constructor(public baseUrn: string) {
    }

    public async sendGet(additionalUrn: string = "",
                         contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .get(this.baseUrn + additionalUrn)
            .set(contentType.name, contentType.value)
            .send();
    }

    public async sendPost(additionalUrn: string = "",
                          body?: string,
                          contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {

        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .post(this.baseUrn)
            .set(contentType.name, contentType.value)
            .send(body);
    }

    public async sendPut(additionalUrn: string = "",
                         body?: string,
                         contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {

        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .put(this.baseUrn + additionalUrn)
            .set(contentType.name, contentType.value)
            .send(body);
    }

    public async sendPatch(additionalUrn: string = "",
                           body?: string,
                           contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .patch(this.baseUrn + additionalUrn)
            .set(contentType.name, contentType.value)
            .send(body);
    }

    public async sendDelete(additionalUrn: string = "",
                            contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .delete(this.baseUrn + additionalUrn)
            .set(contentType.name, contentType.value)
            .send();
    }

    public async sendOptions(additionalUrn: string = "",
                             contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .options(this.baseUrn + additionalUrn)
            .set(contentType.name, contentType.value)
            .send();
    }

    public async sendHead(additionalUrn: string = "",
                          contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .head(this.baseUrn + additionalUrn)
            .set(contentType.name, contentType.value)
            .send();
    }

    public async sendTrace(additionalUrn: string = "",
                           contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .trace(this.baseUrn + additionalUrn)
            .set(contentType.name, contentType.value)
            .send();
    }
}
