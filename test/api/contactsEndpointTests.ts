import * as request from "superagent";
import {ContactsEndpoint, IContactInfoModel} from "../index";

describe('Contacts endpoint tests', async () => {

    const contactsEndpoint = new ContactsEndpoint();
    let response: request.Response;

    describe('Positive cases.', async () => {

        before(async () => {
            const contactInfo: IContactInfoModel = {firstName: "John", lastName: "Doe", email: "john.doe@unknown.com" };
            response = await contactsEndpoint.getContactByItsInfo(contactInfo);
            let aa =2;
        });

        it.only('should ', async () => {
            let a =2;
        });
    });
});