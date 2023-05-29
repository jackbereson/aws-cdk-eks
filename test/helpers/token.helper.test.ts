import { TokenHelper } from "../../src/helpers/token.helper";
import { expect } from "chai";

describe("Functional TokenHelper", () => {
  let token: any;
  let data: any = {
    test: "test",
    role: "ADMIN",
  };
  it("should return a string", (done) => {
    token = TokenHelper.generateToken(data);

    expect(token).to.be.a("string");
    done();
  }, 10000);

  it("decode a token", (done) => {
    let payload: any = TokenHelper.decodeToken(token);

    expect(payload).to.be.an("object");
    expect(payload.role).to.equal(data.role);
    expect(payload.test).to.equal(data.test);
    done();
  });

  it("generate a admin token", (done) => {
    token = TokenHelper.getAdministratorToken();
    expect(token).to.be.a("string");
    done();
  });
});
