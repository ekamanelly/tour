
import { Request, Response } from "express";
export function questionController(handler: any) {
  return async (req: Request, res: Response) => {
    try {
      const { headers, statusCode, data }: any = await handler(req);
      return res.set(headers).status(statusCode).send(data);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  };
}

