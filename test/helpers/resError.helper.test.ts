import { resError } from "../../src/helpers/resError.helper";
import { Response } from "express";

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Functional resError", () => {
  it("test positive resError with info error", (done) => {
    const error = {
      info: {
        status: 200,
        message: "test",
      },
    };
    const res = mockResponse();
    resError(res, error);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(error.info);
    done();
  });

  it("test positive resError with unknown error", (done) => {
    const error = {};
    const res = mockResponse();
    resError(res, error);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      code: "500",
      message: "Có lỗi xảy ra",
    });
    done();
  });
});
