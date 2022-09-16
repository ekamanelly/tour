export const updateQuestion = (httpResponse: any, database: any) => {
    return async (req: any) => {
      const {
        params: { _id },
        body,
      } = req;
      try {
        const result = await database.updateOne({ _id }, { ...body });
        return httpResponse(200, result);
      } catch (error) {
        return httpResponse(400, null);
      }
    };
  };