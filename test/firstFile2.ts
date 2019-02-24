import * as chai from "chai";
import {Severity} from "../allureTypes/severity";
import chaiHttp = require("chai-http");
import {CommonLogger} from "../logger";
import {IAllure} from "../allureTypes/IAllure";

declare const allure: IAllure;

chai.use(chaiHttp);

describe("My testHealth check test 22222222222222", async () => {

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

        allure.description("Some description");
        allure.severity(Severity.MINOR);
        allure.addEnvironment("Local", "localhost");

        chai.expect(true).to.equal(true);
    });

    it.only("Send request2", async () => {
        const testStep = allure.createStep("initial", async () => {

            await allure.createAttachment("my first attachment", "hello world");

            const response = await chai
                .request("http://localhost:8182")
                .get("/healthcheck")
                .send();

            console.log(response);

            const logger = new CommonLogger();
            logger.info("hello from allure and log4js");
            await allure.createAttachment("my first attachment", response.text);
        });

        await testStep();
    });

    it("Send request3", async () => {
        const response = await chai
            .request("http://localhost:8182")
            .get("/healthcheck")
            .send();

        await allure.createAttachment("my second attachment", "hello world");

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
