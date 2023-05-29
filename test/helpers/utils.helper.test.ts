import { UtilsHelper } from "../../src/helpers/utils.helper";
import { expect } from "chai";
import path from "path";
import { ErrorHelper } from "../../src/base/error";

describe("Functional validateJSON", () => {
  it("test positive validateJSON", (done) => {
    let fileList: Array<any> = [];

    fileList = UtilsHelper.walkSyncFiles(path.join(__dirname, "../"), fileList);

    expect(fileList).to.be.an("array");
    expect(fileList.length).to.gt(0);

    done();
  });
});
