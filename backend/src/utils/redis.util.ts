export const createRedisMethods = (redisStore:any) => {
  return {
    get: (key: string) =>
      redisStore
        .get(key)
        .then((storedPost: string | null) =>
          storedPost ? JSON.parse(storedPost) : storedPost
        ),
    set: (key: string, data: any) =>
      redisStore.setEx(key, 3600, JSON.stringify(data)),
  };
};
