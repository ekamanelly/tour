import { questionServiceAdaptor } from "../question.serviceAdaptor";

describe("the Question-service-adaptor", () => {
  const service = jest.fn();
  const allService = {
    getQuestion: service,
    createQuestion: service,
    updateQuestion: service,
    deleteQuestion: service,
  };
  afterEach(jest.clearAllMocks);
  it("should call getQuestion service when a GET request is made", () => {
    const req: any = { method: "UnKnown" };
    const handler = questionServiceAdaptor(allService);
    const result =handler(req);
    expect(service).toBeCalledTimes(0);
    expect(result).toHaveProperty("statusCode", 405)
  });
  it("should call getQuestion service when a GET request is made", () => {
    const req: any = { method: "GET" };
    const handler = questionServiceAdaptor(allService);
    handler(req);
    expect(service).toBeCalledTimes(1);
  });
  it("should call createQuestion service when a POST request is made", () => {
    const req: any = { method: "POST" };
    const handler = questionServiceAdaptor(allService);
    handler(req);
    expect(service).toBeCalledTimes(1);
  });
  it("should call updateQuestion service when a PATCH request is made", () => {
    const req: any = { method: "PATCH" };
    const handler = questionServiceAdaptor(allService);
    handler(req);
    expect(service).toBeCalledTimes(1);
  });
  it("should call deleteQuestion service when a DELETE request is made", () => {
    const req: any = { method: "DELETE" };
    const handler = questionServiceAdaptor(allService);
    handler(req);
    expect(service).toBeCalledTimes(1);
  });
});
