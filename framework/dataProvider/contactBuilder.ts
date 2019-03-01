import {String} from "../helperTypes";
import {IContactInfoModel} from "../models";

export class ContactBuilder {

    public static Create(): ContactBuilder {
        return new ContactBuilder();
    }

    private contactInfo: IContactInfoModel = {email: undefined, lastName: undefined, firstName: undefined};

    public withFirstName(firstName: string): ContactBuilder {
        this.contactInfo.firstName = firstName;
        return this;
    }

    public withLastName(lastName: string): ContactBuilder {
        this.contactInfo.lastName = lastName;
        return this;
    }

    public withEmail(email: string): ContactBuilder {
        this.contactInfo.email = email;
        return this;
    }

    public build(): any {
        for (const property in this.contactInfo) {
            if (this.contactInfo[property] === undefined) {
                delete this.contactInfo[property];
            }
        }
        return {string: JSON.stringify(this.contactInfo), model: this.contactInfo};
    }
}

export interface IBuilderResponse {
    string: string;
    model: IContactInfoModel;
}
