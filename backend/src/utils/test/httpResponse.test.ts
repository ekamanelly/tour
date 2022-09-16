import { httpResponse } from "../httpResponse.util";

describe("The httpResponse,", () => {
  it("should respond with right body", () => {
    const statusCode = 200;
    const data = { correctData: "just any thing" };
    const result = httpResponse(statusCode, data);
    expect(result).toHaveProperty("statusCode", statusCode);
    expect(result).toHaveProperty(['data', 'correctData'], data.correctData)
  });
});
