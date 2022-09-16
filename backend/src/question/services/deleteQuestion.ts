export const deleteQuestion = (httpResponse: any, database: any) => {
    return async (req: any) => {
      const {
        params: { _id },
      } = req;
      try {
        const result = await database.updateOne({ _id }, { isDeleted: true });
        return httpResponse(200, result);
      } catch (error) {
        return httpResponse(400, null);
      }
    };
  };