import { getQuestionByQueryOrId } from "../services/getQuestion";

describe("the getQuestion-handler", () => {
  const httpResponse = jest.fn();
  const then = jest.fn()
  const model = {findOne:jest.fn(()=>({then}))};
  const redisStore= {set:jest.fn(),get:jest.fn() }
  const searchDb = jest.fn()
  const storeValue = {value:'assuming the redis has it stored '}
  beforeEach(jest.clearAllMocks);

  
  it("should check the redisStore with the _id as key ", async () => {
    const req = {
      params: { _id: "ekemaId" },
      query: { pageNum: null, search: null },
    };
    const handler = getQuestionByQueryOrId({httpResponse,model,searchDb,redisStore})
    const res = handler(req)
    expect(redisStore.get).toBeCalledWith(req.params._id);
  });
  it("should check the redisStore with the _id as key and if it exist, should returned  the store data", async () => {
    const req = {
      params: { _id: "ekemaId" },
      query: { pageNum: null, search: null },
    };
    redisStore.get.mockResolvedValue([storeValue])
    const handler = getQuestionByQueryOrId({httpResponse,model,searchDb,redisStore})
    const res = await handler(req)
    expect(redisStore.get).toBeCalledWith(req.params._id);
    expect(model.findOne).toBeCalledTimes(0);
    expect(redisStore.set).toBeCalledTimes(0);
    expect(httpResponse).toBeCalledWith(200,[storeValue] );
  });
  it("should check the mongoDb if the value is not in the redis store ", async () => {
    const req = {
      params: { _id: "ekemaId" },
      query: { pageNum: null, search: null },
    };
    redisStore.get.mockResolvedValue(null)
    then.mockResolvedValue([{data:'value'}])
    const handler = getQuestionByQueryOrId({httpResponse,model,searchDb,redisStore})
    const res = await handler(req)
    expect(redisStore.get).toBeCalledWith(req.params._id);
    expect(model.findOne).toBeCalledTimes(1);
    expect(redisStore.set).toBeCalledWith(req.params._id, [{data:'value'}] );
  });
  it("should check the redisStore the with search and pageNum as key and it exist, should be returned ", async () => {
    const req = {
      params: { _id: null },
      query: { pageNum: 1, search: 'noSearch' },
    };
    redisStore.get.mockResolvedValue(null)
    searchDb.mockResolvedValue({value:'value'})
    const handler = getQuestionByQueryOrId({httpResponse,model,searchDb,redisStore})
    const res = await handler(req)
    expect(redisStore.get).toBeCalledWith(`${req.query.pageNum}_${req.query.search}`);
    expect(model.findOne).toBeCalledTimes(0);
    expect(redisStore.set).toBeCalledWith(`${req.query.pageNum}_${req.query.search}`, {value:'value'});
  });
  it("should respond with status 400 is error is thrown", async () => {
    const req = {
      params: { _id: null },
      query: { pageNum: 1, search: 'noSearch' },
    };
    redisStore.get.mockRejectedValue(new Error("internal server error"));
    // searchDb.mockResolvedValue({value:'value'})
    const handler = getQuestionByQueryOrId({httpResponse,model,searchDb,redisStore})
    const res = await handler(req)
    // expect(redisStore.get).toBeCalledTimes(0);
    expect(model.findOne).toBeCalledTimes(0);
    expect(redisStore.set).toBeCalledTimes(0);
    expect(httpResponse).toBeCalledWith(400, null);
  });
});
