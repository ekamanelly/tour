export const createQuestion = (httpResponse: any, database: any) => {
    return async (req: any) => {
      try {
        const { body, param } = req;
        if(!body.text){
          return httpResponse(400, 'text can not be empty');
        }
        const result = await database.create(body);
        return httpResponse(200, result);
      } catch (error) {
        return httpResponse(400, null);
      }
    };
  };
  