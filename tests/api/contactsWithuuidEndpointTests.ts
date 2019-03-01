import {expect} from "chai";
import {
    BaseEndpoint,
    ContactBuilder, ContactsEndpoint,
    ContactsWithuuidEndpoint,
    Email,
    IBuilderResponse,
    IMainResponseModel,
    Name,
} from "../index";

describe('"Contacts with uuid endpoint tests"', async () => {
    const contactsWithuuidEndpoint = new ContactsWithuuidEndpoint();
    const contactsEndpoint = new ContactsEndpoint();
    let response;
    let responseBody: IMainResponseModel;
    let contactInfo: IBuilderResponse;

    describe("Get contact by id tests", async () => {

        describe("Negative cases", async () => {
            describe("with invalid content type.", async () => {

                beforeEach(async () => {
                    const contactId = "1";
                    response = await contactsWithuuidEndpoint.getContactById(contactId, BaseEndpoint.contentTypeWadlXml);
                });

                it("should return 415 Status Code", async () => {
                    expect(response).to.have.status(415);
                });
            });
        });
    });

    describe("Create contact tests.", async () => {

        describe("Positive cases.", async () => {

            describe("with minimum length.", async () => {

                beforeEach(async () => {
                    // arrange
                    const firstName = Name.WithLengthOf(Name.LengthMin());
                    const lastName = Name.WithLengthOf(Name.LengthMin());

                    const email = Email.WithLengthOf(Email.LengthMin());

                    contactInfo = ContactBuilder.Create()
                        .withFirstName(firstName)
                        .withLastName(lastName)
                        .withEmail(email)
                        .build();

                    // act
                    response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    responseBody = response.body;
                });

                it("should return 201 Created StatusCode", async () => {
                    expect(response).to.have.status(201);
                    expect(responseBody.status).to.eql(201);
                });

                it("should contain contact model in response body ", async () => {
                    expect(responseBody.data[0].info.firstName).to.eql(contactInfo.model.firstName);
                    expect(responseBody.data[0].info.lastName).to.eql(contactInfo.model.lastName);
                    expect(responseBody.data[0].info.email).to.eql(contactInfo.model.email);
                });

                it("should contain refs list in response body ", async () => {
                    const id = responseBody.data[0].id;

                    expect(responseBody.data[0].refs.delete).to.eql(`${ContactsWithuuidEndpoint.RefsUrl}${id}`);
                    expect(responseBody.data[0].refs.get).to.eql(`${ContactsWithuuidEndpoint.RefsUrl}${id}`);
                    expect(responseBody.data[0].refs.patch).to.eql(`${ContactsWithuuidEndpoint.RefsUrl}${id}`);
                    expect(responseBody.data[0].refs.put).to.eql(`${ContactsWithuuidEndpoint.RefsUrl}${id}`);
                });
            });

            describe("with maximum length.", async () => {

                beforeEach(async () => {
                    // arrange
                    const firstName = Name.WithLengthOf(Name.LengthMax());
                    const lastName = Name.WithLengthOf(Name.LengthMax());

                    const email = Email.WithLengthOf(Email.LengthMax());

                    contactInfo = ContactBuilder.Create()
                        .withFirstName(firstName)
                        .withLastName(lastName)
                        .withEmail(email)
                        .build();

                    // act
                    response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    responseBody = response.body;
                });

                it("should return 201 Created StatusCode", async () => {
                    expect(response).to.have.status(201);
                    expect(responseBody.status).to.eql(201);
                });

                it("should contain contact model in response body ", async () => {
                    expect(responseBody.data[0].info.firstName).to.eql(contactInfo.model.firstName);
                    expect(responseBody.data[0].info.lastName).to.eql(contactInfo.model.lastName);
                    expect(responseBody.data[0].info.email).to.eql(contactInfo.model.email);
                });

                it("should contain refs list in response body ", async () => {
                    const id = responseBody.data[0].id;

                    expect(responseBody.data[0].refs.delete).to.eql(`${ContactsWithuuidEndpoint.RefsUrl}${id}`);
                    expect(responseBody.data[0].refs.get).to.eql(`${ContactsWithuuidEndpoint.RefsUrl}${id}`);
                    expect(responseBody.data[0].refs.patch).to.eql(`${ContactsWithuuidEndpoint.RefsUrl}${id}`);
                    expect(responseBody.data[0].refs.put).to.eql(`${ContactsWithuuidEndpoint.RefsUrl}${id}`);
                });
            });
        });

        describe("Negative cases", async () => {

            describe("with invalid content type.", async () => {

                beforeEach(async () => {

                    contactInfo = ContactBuilder.Create()
                        .withFirstName(Name.Valid())
                        .withLastName(Name.Valid())
                        .withEmail(Email.Valid())
                        .build();

                    // act
                    response = await contactsWithuuidEndpoint
                        .createContact(contactInfo.string, BaseEndpoint.contentTypeWadlXml);
                });

                it("should return 415 Status Code", async () => {
                    expect(response).to.have.status(415);
                });
            });

            describe("firstName-related.", async () => {

                describe("without firstName.", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withLastName(Name.Valid())
                            .withEmail(Email.Valid())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 415 Status Code", async () => {
                        expect(response).to.have.status(415);
                    });
                });

                describe("with empty firstName.", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(Name.Empty())
                            .withLastName(Name.Valid())
                            .withEmail(Email.Valid())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 400 Status Code", async () => {
                        expect(response).to.have.status(400);
                    });
                });

                describe("with firstName, starting from space.", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(Name.StartingFromSpace())
                            .withLastName(Name.Valid())
                            .withEmail(Email.Valid())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 400 Status Code", async () => {
                        expect(response).to.have.status(400);
                    });
                });

                describe("with firstName, with invalid length.", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(Name.WithLengthOf(Name.LengthMax() + 1))
                            .withLastName(Name.Valid())
                            .withEmail(Email.Valid())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 400 Status Code", async () => {
                        expect(response).to.have.status(400);
                    });
                });

                describe("with firstName, containing numbers.", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(Name.ContainingNumers())
                            .withLastName(Name.Valid())
                            .withEmail(Email.Valid())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 400 Status Code", async () => {
                        expect(response).to.have.status(400);
                    });
                });

                describe("with equal firstName and lastName.", async () => {

                    beforeEach(async () => {
                        const name = Name.Valid();
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(name)
                            .withLastName(name)
                            .withEmail(Email.Valid())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 400 Status Code", async () => {
                        expect(response).to.have.status(400);
                    });
                });
            });

            describe("lastName-related.", async () => {

                describe("without lastName.", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(Name.Valid())
                            .withEmail(Email.Valid())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 415 Status Code", async () => {
                        expect(response).to.have.status(415);
                    });
                });

                describe("with empty lastName.", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(Name.Valid())
                            .withLastName(Name.Empty())
                            .withEmail(Email.Valid())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 400 Status Code", async () => {
                        expect(response).to.have.status(400);
                    });
                });

                describe("with lastName, starting from space.", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(Name.Valid())
                            .withLastName(Name.StartingFromSpace())
                            .withEmail(Email.Valid())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 400 Status Code", async () => {
                        expect(response).to.have.status(400);
                    });
                });

                describe("with lastName, with invalid length.", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(Name.Valid())
                            .withLastName(Name.WithLengthOf(Name.LengthMax() + 1))
                            .withEmail(Email.Valid())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 400 Status Code", async () => {
                        expect(response).to.have.status(400);
                    });
                });

                describe("with lastName, containing numbers.", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(Name.Valid())
                            .withLastName(Name.ContainingNumers())
                            .withEmail(Email.Valid())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 400 Status Code", async () => {
                        expect(response).to.have.status(400);
                    });
                });
            });

            describe("email-related.", async () => {

                describe("without email.", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(Name.Valid())
                            .withLastName(Name.Valid())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 415 Status Code", async () => {
                        expect(response).to.have.status(415);
                    });
                });

                describe("with email, starting from space.", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(Name.Valid())
                            .withLastName(Name.Valid())
                            .withEmail(Email.StartingFromSpace())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 400 Status Code", async () => {
                        expect(response).to.have.status(400);
                    });
                });

                describe("with email, with invalid length.", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(Name.Valid())
                            .withLastName(Name.Valid())
                            .withEmail(Email.WithLengthOf(Email.LengthMax() + 1))
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 400 Status Code", async () => {
                        expect(response).to.have.status(400);
                    });
                });

                describe("with email, which contains space.", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(Name.Valid())
                            .withLastName(Name.Valid())
                            .withEmail(Email.ContainingSpace())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 400 Status Code", async () => {
                        expect(response).to.have.status(400);
                    });
                });

                describe("with email, which does not contain name.", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(Name.Valid())
                            .withLastName(Name.Valid())
                            .withEmail(Email.WithoutName())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 400 Status Code", async () => {
                        expect(response).to.have.status(400);
                    });
                });

                describe("with email, which does not contain dot sign - @.", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(Name.Valid())
                            .withLastName(Name.Valid())
                            .withEmail(Email.WithoutDotSign())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 400 Status Code", async () => {
                        expect(response).to.have.status(400);
                    });
                });

                describe("with email, which does not contain domain", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(Name.Valid())
                            .withLastName(Name.Valid())
                            .withEmail(Email.WithoutEmailDomain())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 400 Status Code", async () => {
                        expect(response).to.have.status(400);
                    });
                });

                describe("with email, which does not contain point sign - .", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(Name.Valid())
                            .withLastName(Name.Valid())
                            .withEmail(Email.WithoutPointSign())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 400 Status Code", async () => {
                        expect(response).to.have.status(400);
                    });
                });

                describe("with email, which does not contain country code", async () => {

                    beforeEach(async () => {
                        contactInfo = ContactBuilder.Create()
                            .withFirstName(Name.Valid())
                            .withLastName(Name.Valid())
                            .withEmail(Email.WithoutCountryCode())
                            .build();

                        // act
                        response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                    });

                    it("should return 400 Status Code", async () => {
                        expect(response).to.have.status(400);
                    });
                });
            });

            describe("invaid field in model-related.", async () => {

                beforeEach(async () => {
                    contactInfo = ContactBuilder.Create()
                        .withFirstName(Name.Valid())
                        .withLastName(Name.Valid())
                        .withEmail(Email.Valid())
                        .withInvalidField()
                        .build();

                    // act
                    response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                });

                it("should return 415 Status Code", async () => {
                    expect(response).to.have.status(415);
                });
            });

            describe("duplicate-contact related.", async () => {

                beforeEach(async () => {
                    // arrange
                    contactInfo = ContactBuilder.Create()
                        .withFirstName(Name.Valid())
                        .withLastName(Name.Valid())
                        .withEmail(Email.Valid())
                        .build();

                    response = await contactsWithuuidEndpoint.createContact(contactInfo.string);

                    // act
                    response = await contactsWithuuidEndpoint.createContact(contactInfo.string);
                });

                it("should return 400 error", async () => {
                    expect(response).to.have.status(400);
                });
            });
        });

    });

    describe("Update contact by id tests", async () => {

        describe("Negative cases", async () => {

            describe("with invalid content type.", async () => {

                beforeEach(async () => {
                    const contactId = "1";
                    contactInfo = ContactBuilder.Create()
                        .withLastName(Name.Valid())
                        .withFirstName(Name.Valid())
                        .withEmail(Email.Valid())
                        .build();
                    response = await contactsWithuuidEndpoint.updateContactById(contactId, contactInfo.string, BaseEndpoint.contentTypeWadlXml);
                });

                it("should return 415 Status Code", async () => {
                    expect(response).to.have.status(415);
                });
            });
        });

        describe("Positive cases", async () => {

            describe("All fields update of existing contact", async () => {
                beforeEach(async () => {
                    response = await contactsEndpoint.getContactsAll();
                    const contactId = `${response.body.data.pop().id}`;

                    contactInfo = ContactBuilder.Create()
                        .withFirstName(Name.Valid())
                        .withLastName(Name.Valid())
                        .withEmail(Email.Valid())
                        .build();
                    await contactsWithuuidEndpoint.updateContactById(contactId, contactInfo.string);

                    response = await contactsWithuuidEndpoint.getContactById(contactId);
                });

                it("should return 200 Status Code", async () => {
                    expect(response).to.have.status(200);
                });

                it("should return updated info", async () => {
                    const contact = response.body.data.pop();

                    expect(contact.info.email).to.eql(contactInfo.model.email);
                    expect(contact.info.firstName).to.eql(contactInfo.model.firstName);
                    expect(contact.info.lastName).to.eql(contactInfo.model.lastName);
                });
            });
        });
    });

    describe("Partially update contact by id tests", async () => {

        describe("Negative cases", async () => {

            describe("with invalid content type.", async () => {

                beforeEach(async () => {
                    const contactId = "1";
                    contactInfo = ContactBuilder.Create()
                        .withEmail(Email.Valid())
                        .build();
                    response = await contactsWithuuidEndpoint.updateContactPartiallyById(contactId, contactInfo.string, BaseEndpoint.contentTypeWadlXml);
                });

                it("should return 415 Status Code", async () => {
                    expect(response).to.have.status(415);
                });
            });
        });

        describe("Positive cases", async () => {

            describe("FirstName update of existing contact", async () => {

                beforeEach(async () => {
                    response = await contactsEndpoint.getContactsAll();
                    const contactId = `${response.body.data.pop().id}`;

                    contactInfo = ContactBuilder.Create()
                        .withFirstName(Name.Valid())
                        .build();
                    await contactsWithuuidEndpoint.updateContactById(contactId, contactInfo.string);

                    response = await contactsWithuuidEndpoint.getContactById(contactId);
                });

                it("should return 200 Status Code", async () => {
                    expect(response).to.have.status(200);
                });

                it("should return updated info", async () => {
                    const contact = response.body.data.pop();

                    expect(contact.info.firstName).to.eql(contactInfo.model.firstName);
                });
            });
        });
    });

    describe("Delete contact by id tests", async () => {

        describe("Negative cases", async () => {

            describe("with invalid content type.", async () => {

                beforeEach(async () => {
                    const contactId = "1";
                    contactInfo = ContactBuilder.Create()
                        .withLastName(Name.Valid())
                        .withFirstName(Name.Valid())
                        .withEmail(Email.Valid())
                        .build();
                    response = await contactsWithuuidEndpoint.deleteContactById(contactId, BaseEndpoint.contentTypeWadlXml);
                });

                it("should return 415 Status Code", async () => {
                    expect(response).to.have.status(415);
                });
            });
        });

        describe("Positive Cases", async () => {

            describe("Deletion of existing contact", async () => {

                beforeEach(async () => {
                    response = await contactsEndpoint.getContactsAll();
                    const contactId = `${response.body.data.pop().id}`;

                    await contactsWithuuidEndpoint.deleteContactById(contactId);

                    response = await contactsWithuuidEndpoint.getContactById(contactId);
                });

                it("should return 404 Status Code", async () => {
                    expect(response).to.have.status(404);
                });
            });
        });
    });

    describe("Negative HTTP methods tests", async () => {

        const additionalUrl = "/1";

        describe("Send OPTIONS request", async () => {

            beforeEach(async () => {
                response = await contactsWithuuidEndpoint.sendOptions(additionalUrl);
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send HEAD request", async () => {

            beforeEach(async () => {
                response = await contactsWithuuidEndpoint.sendOptions(additionalUrl);
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send TRACE request", async () => {

            beforeEach(async () => {
                response = await contactsWithuuidEndpoint.sendOptions(additionalUrl);
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

    });
});
