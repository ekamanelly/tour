import { createRedisMethods } from "../redis.util";

const store = { set: jest.fn(), get: jest.fn() };
const data = {posts:[]}

describe("the redis util", () => {
  it("should be return a set and get method", () => {
    const store = { set: jest.fn(), get: jest.fn() };
    const result = createRedisMethods(store);
    expect(result).toHaveProperty("get");
    expect(result).toHaveProperty("set");
  });
  it("get method should return data if stored ", async() => {    
    const store = { set: jest.fn(), get: jest.fn().mockResolvedValue(JSON.stringify(data)) };
    const key = 'storageKey'
    const redisStore = createRedisMethods(store);
    const result = await redisStore.get(key)
    expect(store.get).toBeCalledTimes(1);
    expect(store.get).toBeCalledWith(key);
    expect(result).toEqual(data)
  });
  it("get method should return null if not stored", async() => {    
    const store = { set: jest.fn(), get: jest.fn().mockResolvedValue(null) };
    const key = 'storageKey'
    const redisStore = createRedisMethods(store);
    const result = await redisStore.get(key)
    expect(store.get).toBeCalledTimes(1);
    expect(store.get).toBeCalledWith(key);
    expect(result).toEqual(null)
  });
  it("should be return get method", () => {
    const store = { setEx: jest.fn(), get: jest.fn() };
    const key = 'storageKey' 
    const result = createRedisMethods(store);
    result.set(key, data)
    expect(store.setEx).toBeCalledTimes(1);
    expect(store.setEx).toBeCalledWith(key,3600, JSON.stringify(data));
  });
});
