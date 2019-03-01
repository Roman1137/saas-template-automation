import {expect} from "chai";
import * as request from "superagent";
import {ApplicationEndpoint, ReporterLogger} from "../index";

describe("Application.wadl endpoint tests.", async () => {

    const appEndpoint = new ApplicationEndpoint();
    let response: request.Response;

    describe("Positive cases.", async () => {

        beforeEach("Send Get request with valid params", async () => {
            response = await appEndpoint.getAppDescription();
        });

        it("should respond with 200 Status Code", async () => {
            expect(response).to.have.status(200);
        });

        it("should contain specific Content type", async () => {
            expect(response.type).to.eql("application/vnd.sun.wadl+xml");
        });

        it("should contain Content-Length > 0", async () => {
            const contentLength: number = +response.header["content-length"];
            expect(contentLength).to.be.greaterThan(0);
        });
    });

    describe("Negative HTTP methods tests.", async () => {

        describe("Send OPTIONS request", async () => {

            beforeEach(async () => {
                response = await appEndpoint.sendOptions();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send HEAD request", async () => {

            beforeEach(async () => {
                response = await appEndpoint.sendHead();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send POST request", async () => {

            beforeEach(async () => {
                response = await appEndpoint.sendPost();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send PUT request", async () => {

            beforeEach(async () => {
                response = await appEndpoint.sendPut();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send PATCH request", async () => {

            beforeEach(async () => {
                response = await appEndpoint.sendPatch();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send DELETE request", async () => {

            beforeEach(async () => {
                response = await appEndpoint.sendDelete();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send TRACE request", async () => {

            beforeEach(async () => {
                response = await appEndpoint.sendTrace();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });
    });
});
