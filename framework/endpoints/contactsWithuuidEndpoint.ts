import * as request from "superagent";
import {BaseEndpoint} from "./baseEndpoint";

export class ContactsWithuuidEndpoint extends BaseEndpoint {
    constructor() {
        const uniformResourceName = "/api/v1/contacts";
        super(uniformResourceName);
    }

    public async getContactById(contactId: string): Promise<request.Response> {
        return await this.sendGet(contactId);
    }

    public async createContact(contactInfo: string): Promise<request.Response> {
        return await this.sendPost(undefined, contactInfo);
    }

    public async updateContactById(contactId: string,
                                   contactInfo: string): Promise<request.Response> {
        return await this.sendPut(contactId, contactInfo);
    }

    public async updateContactPartiallyById(contactId: string,
                                            contactInfo: string): Promise<request.Response> {
        return await this.sendPatch(contactId, contactInfo);
    }

    public async deleteContactById(contactId: string): Promise<request.Response> {
        return await this.sendDelete(contactId);
    }
}
