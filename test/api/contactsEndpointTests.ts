import * as request from "superagent";
import {ContactsEndpoint, IContactInfoModel} from "../index";

describe("Contacts endpoint tests", async () => {

    const contactsEndpoint = new ContactsEndpoint();
    let response: request.Response;

    describe("Get contact by its info", async () => {

        before(async () => {
            const contactInfo: IContactInfoModel = {firstName: "John", lastName: "Doe", email: "john.doe@unknown.com" };
            response = await contactsEndpoint.getContactByItsInfo(contactInfo);
            const aa = 2;
        });

        it("should ", async () => {
            const a = 2;
        });
    });

    describe("Get all contacts", async () => {

        before(async () => {
            response = await contactsEndpoint.getContactsAll();
            const aa = 2;
        });

        it("should ", async () => {
            const a = 2;
        });
    });
});
