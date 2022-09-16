import { deleteQuestion } from "../services/deleteQuestion";

describe("the deleteQuestion-handler", () => {
  afterEach(jest.clearAllMocks);
  it("should delete a Question collection isDeleted field to true", async () => {
    const req = {
      params: { _id: "Paul hope you like stubbing function cause I love it" },
      body:{acknowledged:true}
    };
    const httpResponse = jest.fn();
    const updateOne = jest.fn();
    updateOne.mockImplementation(() => Promise.resolve(req.body));
    const handler = deleteQuestion(httpResponse, { updateOne });
    const result = await handler(req);
    console.log(result)
    expect(updateOne).toBeCalledWith({_id :req.params._id}, {isDeleted:true});
    expect(httpResponse).toBeCalledWith(200,req.body);
  });
  it("should response with status 400 when error occurs ", async () => {
    const req = {
    params: { _id: "Paul hope you like stubbing function cause I love it" },
    body:{acknowledged:true}
  };
    const httpResponse = jest.fn();
    const updateOne = jest.fn();
    updateOne.mockRejectedValue(new Error("internal server error"));
    const handler = deleteQuestion(httpResponse, { updateOne });
    await handler(req);
    expect(updateOne).toBeCalledWith({_id :req.params._id}, {isDeleted:true});
    expect(httpResponse).toBeCalledWith(400, null);
  });
});
