import { ParseQueryHelper } from "../../src/helpers/parseQuery.helper";
import { expect } from "chai";

describe("Functional ParseQueryHelper.parseGetList", () => {
  it("test positive parseGetList", (done) => {
    let result = ParseQueryHelper.parseGetList({ limit: 100 });

    console.log(result);

    expect(result).to.be.an("object");
    expect(result).to.deep.equal({
      filter: {},
      limit: 100,
      offset: 0,
      order: {},
      pagination: { limit: 100, offset: 0, page: 1 },
    });

    done();
  });

  it("test positive parseGetList with search", (done) => {
    let result = ParseQueryHelper.parseGetList({ limit: 100, search: "hello" });

    console.log(result);

    expect(result).to.be.an("object");
    expect(result).to.deep.equal({
      filter: { $text: { $search: "hello " } },
      limit: 100,
      offset: 0,
      order: { score: { $meta: "textScore" } },
      pagination: { limit: 100, offset: 0, page: 1 },
      select: { score: { $meta: "textScore" } },
    });

    done();
  });
});
