import {BaseEndpoint} from "./baseEndpoint";
import {IContactInfoModel} from "../models";
import * as request from "superagent";

export class ContactsEndpoint extends BaseEndpoint {
    constructor() {
        const uniformResourceName = "/api/v1/contacts";
        super(uniformResourceName);
    }


    public async getContactByItsInfo(contactInfo: IContactInfoModel): Promise<request.Response> {
        super.parameters = this.getParamsUrl(contactInfo);
        return await this.sendGet();
    }

    private getParamsUrl(contactInfo: IContactInfoModel): string {
        let paramsUrl = "";
        for (const contactProperty in contactInfo) {
            const dividingSign = this.getDividingSign(paramsUrl);
            const contactUrlPart = `${dividingSign}${contactProperty.toLowerCase()}=${contactInfo[contactProperty]}`;
            paramsUrl += contactUrlPart;
        }

        return paramsUrl;
    }

    private getDividingSign(paramsUrl: string): string {
        return paramsUrl === ""
            ? "?"
            : "&";
    }
}
