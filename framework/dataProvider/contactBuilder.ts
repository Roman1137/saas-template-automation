import {String} from "../helperTypes";
import {IContactInfoModel} from "../models";
import {RandomDataGenerator} from "./randomDataGenerator";

export class ContactBuilder {

    public static Create(): ContactBuilder {
        return new ContactBuilder();
    }
    private contactInfo: IContactInfoModel = {email: String.Empty, lastName: String.Empty, firstName: String.Empty};

    public withFirstName(): ContactBuilder {
        this.contactInfo.firstName = RandomDataGenerator.getRandomName();
        return this;
    }

    public withLastName(): ContactBuilder {
        this.contactInfo.lastName = RandomDataGenerator.getRandomName();
        return this;
    }

    public withEmail(): ContactBuilder {
        this.contactInfo.email = RandomDataGenerator.getRandomEmail();
        return this;
    }

    public build(): string {
        return JSON.stringify(this.contactInfo);
    }
}