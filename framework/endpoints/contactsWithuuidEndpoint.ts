import * as request from "superagent";
import {ReporterLogger} from "../../loggers";
import {IContentType} from "../models";
import {BaseEndpoint} from "./baseEndpoint";

export class ContactsWithuuidEndpoint extends BaseEndpoint {
    public static RefsUrl = "http://host:port/api/v1/contacts/";

    constructor() {
        const uniformResourceName = "/api/v1/contacts";
        super(uniformResourceName);
    }

    public async getContactById(contactId: string,
                                contentType?: IContentType): Promise<request.Response> {
        return ReporterLogger.createStep(`Getting contact by id ${contactId}`, async () => {
            return await this.sendGet(`/${contactId}`, contentType);
        })();
    }

    public async createContact(contactInfo: string,
                               contentType?: IContentType): Promise<request.Response> {
        return ReporterLogger.createStep(`Creating contact using contactInfo ${contactInfo}`, async () => {
            return await this.sendPost(undefined, contactInfo, contentType);
        })();
    }

    public async updateContactById(contactId: string,
                                   contactInfo: string,
                                   contentType?: IContentType): Promise<request.Response> {
        return ReporterLogger.createStep(`Updating contact with id ${contactId} using contactInfo ${contactInfo}`, async () => {
            return await this.sendPut(`/${contactId}`, contactInfo, contentType);
        })();
    }

    public async updateContactPartiallyById(contactId: string,
                                            contactInfo: string,
                                            contentType?: IContentType): Promise<request.Response> {
        return ReporterLogger.createStep(`Partially updating contact with id ${contactId} using contactInfo ${contactInfo}`, async () => {
            return await this.sendPatch(`/${contactId}`, contactInfo, contentType);
        })();
    }

    public async deleteContactById(contactId: string,
                                   contentType?: IContentType): Promise<request.Response> {
        return ReporterLogger.createStep(`Deleting contact with id ${contactId}`, async () => {
            return await this.sendDelete(`/${contactId}`, contentType);
        })();
    }
}
