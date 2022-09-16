import { questionController } from "../question.controller";

describe("the question-controller", () => {
  afterEach(jest.clearAllMocks);
  it("should respond with status 200 when handler has no error ", async () => {
    const handler = jest.fn();
    handler.mockResolvedValueOnce({
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      data: { foo: "foo" },
    });
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));
    const res: any = {
      status: jest.fn(() => ({ end: jest.fn() })),
      set: jest.fn(() => ({ status })),
    };
    const req: any = {};
    const resHandler = questionController(handler);
    const result = await resHandler(req, res);
    expect(handler).toHaveBeenCalledWith(req);
    expect(status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith({ foo: "foo" });
  });
  it("should respond with status 500 when handler throws an error", async () => {
    const handler = jest.fn();
    handler.mockRejectedValue(new Error("internal server error"));
    const res: any = {
      status: jest.fn(() => ({ end: jest.fn() })),
    };
    const req: any = {};
    const resHandler = questionController(handler);
    await resHandler(req, res);
    expect(handler).toHaveBeenCalledWith(req);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
