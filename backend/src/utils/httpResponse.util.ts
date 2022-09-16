export const httpResponse = (statusCode: number, body: any) => {
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode,
      data: { ...body },
    };
  };