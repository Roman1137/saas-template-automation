import {ContactBuilder, ContactsWithuuidEndpoint} from "../index";

describe('"Contacts with uuid endpoint tests"', async () => {
    const contactsWithuuidEndpoint = new ContactsWithuuidEndpoint();
    let response;

    describe("Get contact by id tests", async () => {

    });

    describe("Create contact tests", async () => {

        before(async () => {
            const contactInfo = ContactBuilder.Create()
                .withFirstName()
                .withLastName()
                .withEmail()
                .build();

            response = await contactsWithuuidEndpoint.createContact(contactInfo);
            let a =2;
        });


        it('should ', async () => {

        });


    });

    describe("Update contact by id tests", async () => {

    });

    describe("Partially update contact by id tests", async () => {

    });

    describe("Delete contact by id tests", async () => {

    });
});