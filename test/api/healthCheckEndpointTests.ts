import {expect} from "chai";
import * as request from "superagent";
import {ContentType, HealthcheckEndpoint} from "../index";

describe("HealthCheck endpoint tests.", async () => {

    const healthcheckEndpoint = new HealthcheckEndpoint();
    let response: request.Response;

    describe("Positive cases.", async () => {

        before("Send Get request with valid params", async () => {
            response = await healthcheckEndpoint.sendGet();
        });

        it("should respond with 200 Status Code", async () => {
            expect(response).to.have.status(200);
        });

        it("should return specific text", async () => {
            expect(response.text).to.eq(healthcheckEndpoint.SUCCESS_TEXT_RESPONSE);
        });

        it("should contain specific Content type", async () => {
            expect(response.type).to.eql(ContentType.TEXT_PLAIN);
        });

        it("should contain Content-Length > 0", async () => {
            const contentLength: number = +response.header["content-length"];
            expect(contentLength).to.be.greaterThan(0);
        });
    });

    describe("Negative cases.", async () => {

        describe("Send OPTIONS request", async () => {

            before(async () => {
                response = await healthcheckEndpoint.sendOptions();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send HEAD request", async () => {

            before(async () => {
                response = await healthcheckEndpoint.sendHead();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send POST request", async () => {

            before(async () => {
                response = await healthcheckEndpoint.sendPost();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send PUT request", async () => {

            before(async () => {
                response = await healthcheckEndpoint.sendPut();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send PATCH request", async () => {

            before(async () => {
                response = await healthcheckEndpoint.sendPatch();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send DELETE request", async () => {

            before(async () => {
                response = await healthcheckEndpoint.sendDelete();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });

        describe("Send TRACE request", async () => {

            before(async () => {
                response = await healthcheckEndpoint.sendTrace();
            });

            it("should return 405 StatusCode", async () => {
                expect(response).to.have.status(405);
            });
        });
    });
});
