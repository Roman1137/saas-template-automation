import * as request from "superagent";
import {BaseEndpoint} from "./baseEndpoint";
import {IContentType} from "../models";

export class ContactsWithuuidEndpoint extends BaseEndpoint {
    public static RefsUrl = "http://host:port/api/v1/contacts/";

    constructor() {
        const uniformResourceName = "/api/v1/contacts";
        super(uniformResourceName);
    }

    public async getContactById(contactId: string,
                                contentType?: IContentType): Promise<request.Response> {
        return await this.sendGet(`/${contactId}`, contentType);
    }

    public async createContact(contactInfo: string,
                               contentType?: IContentType): Promise<request.Response> {
        return await this.sendPost(undefined, contactInfo, contentType);
    }

    public async updateContactById(contactId: string,
                                   contactInfo: string,
                                   contentType?: IContentType): Promise<request.Response> {
        return await this.sendPut(`/${contactId}`, contactInfo, contentType);
    }

    public async updateContactPartiallyById(contactId: string,
                                            contactInfo: string,
                                            contentType?: IContentType): Promise<request.Response> {
        return await this.sendPatch(`/${contactId}`, contactInfo, contentType);
    }

    public async deleteContactById(contactId: string,
                                   contentType?: IContentType): Promise<request.Response> {
        return await this.sendDelete(`/${contactId}`, contentType);
    }
}
