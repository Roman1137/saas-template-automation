import * as chai from "chai";
import chaiHttp = require("chai-http");

require("mocha-allure-reporter");
declare const allure: any;

chai.use(chaiHttp);

describe("My testHealth check test", async () => {

   /* beforeEach(() => {
        allure.feature('Open browser');
        allure.story('search someting in google');

        allure.createStep("Some test step", "Making something");
        allure.description("Some description");
        allure.severity("blocker");
        allure.addEnvironment("Local", "localhost");
    });*/

    /*const testStep = allure.createStep("initial", async () => {

        const response = await chai
            .request("http://localhost:8182")
            .get("/healthcheck")
            .send();

        console.log(response);
    });*/

    it("Send request", async () => {
        allure.feature('Open browser');
        allure.story('search someting in google');

        allure.createStep("Some test step", "Making something");
        allure.description("Some description");
        allure.severity("blocker");
        allure.addEnvironment("Local", "localhost");

        chai.expect(true).to.equal(true);
    });

    it("Send request2", async () => {
        const testStep = allure.createStep("initial", async () => {

            const response = await chai
                .request("http://localhost:8182")
                .get("/healthcheck")
                .send();

            console.log(response);
            return response;
        });

        await testStep();
    });

    it("Send request3", async () => {
        const response = await chai
            .request("http://localhost:8182")
            .get("/healthcheck")
            .send();

        console.log(response);
    });

    it("Send request4", async () => {
        const response = await chai
            .request("http://localhost:8182")
            .get("/healthcheck")
            .send();

        console.log(response);
    });
});
