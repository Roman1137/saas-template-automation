import {expect} from "chai";
import {
    BaseEndpoint,
    ContactBuilder,
    ContactsWithuuidEndpoint,
    Email,
    IBuilderResponse,
    IMainResponseModel,
    Name,
} from "../index";

describe('"Contacts with uuid endpoint tests"', async () => {
    const contactsWithuuidEndpoint = new ContactsWithuuidEndpoint();
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
                    expect(response.body.data[0].info.firstName).to.eql(contactInfo.model.firstName);
                    expect(response.body.data[0].info.lastName).to.eql(contactInfo.model.lastName);
                    expect(response.body.data[0].info.email).to.eql(contactInfo.model.email);
                });

                it("should contain refs list in response body ", async () => {
                    const id = response.body.data[0].id;

                    expect(response.body.data[0].refs.delete).to.eql(`${ContactsWithuuidEndpoint.RefsUrl}${id}`);
                    expect(response.body.data[0].refs.get).to.eql(`${ContactsWithuuidEndpoint.RefsUrl}${id}`);
                    expect(response.body.data[0].refs.patch).to.eql(`${ContactsWithuuidEndpoint.RefsUrl}${id}`);
                    expect(response.body.data[0].refs.put).to.eql(`${ContactsWithuuidEndpoint.RefsUrl}${id}`);
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
                    expect(response.body.data[0].info.firstName).to.eql(contactInfo.model.firstName);
                    expect(response.body.data[0].info.lastName).to.eql(contactInfo.model.lastName);
                    expect(response.body.data[0].info.email).to.eql(contactInfo.model.email);
                });

                it("should contain refs list in response body ", async () => {
                    const id = response.body.data[0].id;

                    expect(response.body.data[0].refs.delete).to.eql(`${ContactsWithuuidEndpoint.RefsUrl}${id}`);
                    expect(response.body.data[0].refs.get).to.eql(`${ContactsWithuuidEndpoint.RefsUrl}${id}`);
                    expect(response.body.data[0].refs.patch).to.eql(`${ContactsWithuuidEndpoint.RefsUrl}${id}`);
                    expect(response.body.data[0].refs.put).to.eql(`${ContactsWithuuidEndpoint.RefsUrl}${id}`);
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
