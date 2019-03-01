import * as request from "superagent";
import {String} from "../helperTypes";
import {IContactInfoModel} from "../models";
import {BaseEndpoint} from "./baseEndpoint";
import {ReporterLogger} from "../../loggers";

export class ContactsEndpoint extends BaseEndpoint {
    constructor() {
        const uniformResourceName = "/api/v1/contacts";
        super(uniformResourceName);
    }

    public async getContactByItsInfo(contactInfo: IContactInfoModel): Promise<request.Response> {
        return ReporterLogger.createStep(`Getting contact by contact info ${contactInfo}`, async () => {
            const additionalUrn = this.getUrnByContactInfo(contactInfo);
            return await this.sendGet(additionalUrn);
        })();
    }

    public async getContactsAll(): Promise<request.Response> {
        return ReporterLogger.createStep(`Getting all contacts`, async () => {
            return await this.sendGet();
        })();
    }

    private getUrnByContactInfo(contactInfo: IContactInfoModel): string {
        // building url using parameters name and values
        let paramsUrl = "";
        for (const contactProperty in contactInfo) {
            const dividingSign = this.getDividingSign(paramsUrl);
            const contactUrlPart = `${dividingSign}${contactProperty.toLowerCase()}=${contactInfo[contactProperty]}`;
            paramsUrl += contactUrlPart;
        }

        return paramsUrl;
    }

    private getDividingSign(paramsUrl: string): string {
        return paramsUrl === String.Empty
            ? "?"
            : "&";
    }
}
