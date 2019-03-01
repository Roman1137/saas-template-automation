import * as chai from "chai";
import * as request from "superagent";
import {
    ContentType,
    IContentType,
    String,
} from "../index";
import {ReporterLogger} from "../../loggers";

export class BaseEndpoint {

    private static get contentTypeJson(): IContentType {
        return {name: "Content-Type", value: ContentType.APPLICATION_JSON} as IContentType;
    }

    constructor(public baseUrn: string) {
    }

    public async sendGet(additionalUrn: string = String.Empty,
                         contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .get(this.baseUrn + additionalUrn)
            .set(contentType.name, contentType.value)
            .send()
            .then((r) => {
                    const step = ReporterLogger.createStep("one more step", () => {
                        ReporterLogger.createAttachment("tratata2", JSON.stringify(r));
                    });
                    step();
                    return r;
                }
            );
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
