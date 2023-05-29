import { validateJSON } from "../../src/helpers/validateJSON.helper";
import { expect } from "chai";
import { ErrorHelper } from "../../src/base/error";

describe("Functional validateJSON", () => {
  it("test positive validateJSON", (done) => {
    const result = validateJSON(
      {
        data: "hello",
      },
      {
        type: "object",
        properties: {
          data: {
            type: "string",
          },
        },
      }
    );

    expect(result).to.equal(true);

    done();
  });

  it("test negative validateJSON", (done) => {
    const result = () => {
      try {
        validateJSON(
          {
            data: "hello",
            test: "hello",
          },
          {
            type: "object",
            properties: {
              data: {
                type: "string",
              },
            },
            additionalProperties: false,
          }
        );
      } catch (err) {
        throw err;
      }
    };

    expect(result).to.throw();

    done();
  });
});
