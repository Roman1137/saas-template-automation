import {expect} from "chai";
import * as request from "superagent";
import {
    ContactBuilder,
    ContactsEndpoint,
    ContactsWithuuidEndpoint,
    Email,
    IBuilderResponse, IMainResponseModel,
    Name,
} from "../index";

describe("Contacts endpoint tests", async () => {

    const contactsEndpoint = new ContactsEndpoint();
    const contactsWithuuidEndpoint = new ContactsWithuuidEndpoint();
    let contactInfo: IBuilderResponse;
    let response: request.Response;
    let responseBody: IMainResponseModel;

    describe("Get contact by its info", async () => {

        before(async () => {
            // arrange
            contactInfo = ContactBuilder.Create()
                .withFirstName(Name.Valid())
                .withLastName(Name.Valid())
                .withEmail(Email.Valid())
                .build();

            await contactsWithuuidEndpoint.createContact(contactInfo.string);

            // act
            response = await contactsEndpoint.getContactByItsInfo(contactInfo.model);
            responseBody = response.body;
        });

        it("should return 200 StatusCode", async () => {
            expect(response).to.have.status(200);
        });

        it("should contain contact model in response body ", async () => {
            expect(responseBody.data[0].info.firstName).to.eql(contactInfo.model.firstName);
            expect(responseBody.data[0].info.lastName).to.eql(contactInfo.model.lastName);
            expect(responseBody.data[0].info.email).to.eql(contactInfo.model.email);
        });
    });

    describe("Get all contacts", async () => {

        before(async () => {
            // arrange
            contactInfo = ContactBuilder.Create()
                .withFirstName(Name.Valid())
                .withLastName(Name.Valid())
                .withEmail(Email.Valid())
                .build();

            await contactsWithuuidEndpoint.createContact(contactInfo.string);

            // act
            response = await contactsEndpoint.getContactsAll();
            responseBody = response.body;
        });

        it("should return 200 StatusCode", async () => {
            expect(response).to.have.status(200);
        });

        it("should contain contact model in response body ", async () => {
            const contains = responseBody.data.some((contact) => contact.info.email === contactInfo.model.email);
            expect(contains, `Just created contact ${contactInfo.string}
                        should be displayed in all contacts list ${JSON.stringify(responseBody.data)}`)
                .to.be.true;
        });
    });

    describe("Negative HTTP methods tests.", async () => {

        describe("Send OPTIONS request", async () => {

            before(async () => {
                response = await contactsEndpoint.sendOptions();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send HEAD request", async () => {

            before(async () => {
                response = await contactsEndpoint.sendHead();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send POST request", async () => {

            before(async () => {
                response = await contactsEndpoint.sendPost();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send PUT request", async () => {

            before(async () => {
                response = await contactsEndpoint.sendPut();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send PATCH request", async () => {

            before(async () => {
                response = await contactsEndpoint.sendPatch();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send DELETE request", async () => {

            before(async () => {
                response = await contactsEndpoint.sendDelete();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send TRACE request", async () => {

            before(async () => {
                response = await contactsEndpoint.sendTrace();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });
    });
});
