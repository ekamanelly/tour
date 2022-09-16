import { updateQuestion } from "../services/updateQuestion";


describe("the deleteQuestion-handler", () => {
  afterEach(jest.clearAllMocks);
  it("should update a Question collection with the body", async () => {
    const req = {
      params: { _id: "anyId" },
      body: { text: "on the second thought, I love a  whole lot " }
    };
    const httpResponse = jest.fn();
    const updateOne = jest.fn();
    updateOne.mockImplementation(() => Promise.resolve(req.body));
    const handler = updateQuestion(httpResponse, { updateOne });
    const result = await handler(req);
    console.log(result)
    expect(updateOne).toBeCalledWith({_id :req.params._id}, req.body);
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
    const handler = updateQuestion(httpResponse, { updateOne });
    await handler(req);
    expect(updateOne).toBeCalledWith({_id :req.params._id}, req.body);
    expect(httpResponse).toBeCalledWith(400, null);
  });
});
