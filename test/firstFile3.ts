import * as chai from "chai";
import chaiHttp = require("chai-http");
import {IAllure} from "../loggers/reporterLogger/allureTypes/IAllure";
import {Severity} from "../loggers/reporterLogger/allureTypes/severity";

declare const allure: IAllure;

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
        allure.story('some story name');

        allure.addArgument("language", "Typescript");

        allure.description("Some description");
        allure.severity(Severity.NORMAL);
        allure.addEnvironment("Local", "localhost");

        chai.expect(true).to.equal(true);
    });

    it("Test step", async () => {
        allure.addLabel("My Lable", "Lable value");
        allure.epic("Romans epic");
        allure.addArgument("County", "Ukraine");


        chai.expect(true).to.equal(true);
    });

    it("Send request2", async () => {
        const testStep = allure.createStep("initial", async () => {

            const response = await chai
                .request("http://localhost:8182")
                .get("/healthcheck")
                .send();

            console.log(response);
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
