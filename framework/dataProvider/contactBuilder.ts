import {IContactInfoModel} from "../models";
import {RandomDataGenerator} from "./randomDataGenerator";

export class ContactBuilder {

    public static Create(): ContactBuilder {
        return new ContactBuilder();
    }
    private randomDataGenerator: RandomDataGenerator;
    private contactInfo: IContactInfoModel = {email: "", lastName: "", firstName: ""};

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