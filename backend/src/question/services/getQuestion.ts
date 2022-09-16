

export interface IService {
    httpResponse?: any;
    model?: any;
    redisStore?: any;
    searchDb?: any
  }

export const getQuestionByQueryOrId = ({ httpResponse, model, redisStore, searchDb }: IService ) => {
    return async (req: any) => {
      try {
        const {
          params: { _id },
          query: { pageNum, search },
        } = req;
        let result;
        if (_id) {
          result = await redisStore.get(_id);
          if (!result) {
            
            result = await model.findOne({ _id, isDeleted: false }).then((data:any )=>data._doc);
            redisStore.set(_id, result);
          }
        } else {
          const pageKey = pageNum || "1"
          const searchKey = search || "noSearch"
          result = await redisStore.get(`${pageKey}_${searchKey}`);
          if (!result) {
            result = await searchDb({
              pageNum,
              search,
              model: model,
              field: "text",
            });
            redisStore.set(`${pageKey}_${searchKey}`, result);
          }
        }
        return httpResponse(200, result);
      } catch (error) {
        console.log(error)
        return httpResponse(400, null);
      }
    };
  };
  
  