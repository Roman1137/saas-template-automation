import {String} from "../helperTypes";
import {IContactInfoModel} from "../models";
import {RandomDataGenerator} from "./randomDataGenerator";

export class ContactBuilder {

    public static Create(): ContactBuilder {
        return new ContactBuilder();
    }
    private contactInfo: IContactInfoModel = {email: String.Empty, lastName: String.Empty, firstName: String.Empty};

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

    public build(): IBuilderResponse {
        return {string: JSON.stringify(this.contactInfo), model: this.contactInfo};
    }
}

interface IBuilderResponse {
    string: string;
    model: IContactInfoModel;
}
