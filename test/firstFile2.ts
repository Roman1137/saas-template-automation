import * as chai from "chai";
import {Severity} from "../loggers/reporterLogger/allureTypes/severity";
import chaiHttp = require("chai-http");
import {ConsoleLogger} from "../loggers/consoleLogger/consoleLogger";

import {ReporterLogger} from "../loggers/reporterLogger/ReporterLogger";

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
        ReporterLogger.feature('Open browser');
        ReporterLogger.story('search someting in google');

        ReporterLogger.description("Some description");
        ReporterLogger.severity(Severity.MINOR);
        ReporterLogger.addEnvironment("Local", "localhost");

        chai.expect(true).to.equal(true);
    });

    it("Send request2", async () => {
        const sendRequest = ReporterLogger.createStep("send GET request", async () => {
            ConsoleLogger.info("sending GET Message");
        });

        const testStep = ReporterLogger.createStep("initial", async () => {

            await ReporterLogger.createAttachment("my first attachment", "hello world");

            const response = await chai
                .request("http://localhost:8182")
                .get("/healthcheck")
                .send();

            sendRequest();

            ConsoleLogger.info("hello from allure and log4js");
            await ReporterLogger.createAttachment("my first attachment", response.text);
            chai.expect(true).to.equal(true);
        });

        await testStep();

        const assert = ReporterLogger.createStep("expect true, to equal true", async () => {
            chai.expect(true).to.equal(true);
        });

        await assert();

        chai.expect(true).to.equal(true);

    });

    it("Send request3", async () => {
        const response = await chai
            .request("http://localhost:8182")
            .get("/healthcheck")
            .send();

        await ReporterLogger.createAttachment("my second attachment", "hello world");

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
