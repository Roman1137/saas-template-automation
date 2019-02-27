import * as chai from "chai";
import * as request from "superagent";
import {ContentType} from "../helpers";
import {IContactInfoModel, IContentType} from "../models";

export class BaseEndpoint {

    private static get contentTypeJson(): IContentType {
        return {name: "Content-Type", value: ContentType.APPLICATION_JSON} as IContentType;
    }

    protected additionalUrn: string = "";

    constructor(public baseUrn: string) {}

    private get wholeUrn(): string {
        return this.baseUrn + this.additionalUrn;
    }

    public async sendGet(contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .get(this.wholeUrn)
            .set(contentType.name, contentType.value)
            .send();
    }

    public async sendPost(contentType: IContentType = BaseEndpoint.contentTypeJson,
                          body?: IContactInfoModel | string): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .post(this.wholeUrn)
            .set(contentType.name, contentType.value)
            .send(body);
    }

    public async sendPut(contentType: IContentType = BaseEndpoint.contentTypeJson,
                         body?: IContactInfoModel | string): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .put(this.wholeUrn)
            .set(contentType.name, contentType.value)
            .send(body);
    }

    public async sendPatch(contentType: IContentType = BaseEndpoint.contentTypeJson,
                           body?: IContactInfoModel | string): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .patch(this.wholeUrn)
            .set(contentType.name, contentType.value)
            .send(body);
    }

    public async sendDelete(contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .delete(this.wholeUrn)
            .set(contentType.name, contentType.value)
            .send();
    }

    public async sendOptions(contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .options(this.wholeUrn)
            .set(contentType.name, contentType.value)
            .send();
    }

    public async sendHead(contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .head(this.wholeUrn)
            .set(contentType.name, contentType.value)
            .send();
    }

    public async sendTrace(contentType: IContentType = BaseEndpoint.contentTypeJson): Promise<request.Response> {
        return await chai
            .request(process.env.SAAS_TEMPLATE_LOCAL)
            .trace(this.wholeUrn)
            .set(contentType.name, contentType.value)
            .send();
    }
}