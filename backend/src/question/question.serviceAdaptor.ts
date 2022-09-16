

export function questionServiceAdaptor(questionService: any) {
    return (req: Request) => {
      switch (req.method) {
        case 'GET':
          return questionService.getQuestion(req);
        case 'POST':
          return questionService.createQuestion(req);
        case 'PATCH':
          return questionService.updateQuestion(req);
        case 'DELETE':
          return questionService.deleteQuestion(req);
        default:
          return {
            headers: {
              'Content-Type': 'application/json',
            },
            statusCode: 405,
            errorMessage: '${req.method} method not allowed.',
          };
      }
    };
  }

