import * as chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Health check test", async () => {

    it("Send request", async () => {
        const response = await chai
            .request("http://localhost:8182")
            .get("/healthcheck")
            .send();

        console.log(response);
    });
});
