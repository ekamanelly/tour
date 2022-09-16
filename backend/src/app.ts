import express, { Router, Request, Response } from "express";
import { createClient } from "redis";
import { createRedisMethods } from "./utils/redis.util";
import { removeDuplicate } from "./utils/removeDuplicated.util";
import { httpResponse } from "./utils/httpResponse.util";
import { questionRoute } from "./question/question.route";
import { questionController } from "./question/question.controller";
import { questionServiceAdaptor } from "./question/question.serviceAdaptor";
import { createQuestionService } from "./question/question.service";
import { urlencoded } from "body-parser";





export const createApp = () => {
  const app = express();
  const redisClient = createClient({ url: 'redis://redis:6379' });



  redisClient.on("error", (err) => console.log("Redis redisClient Error", err));
  redisClient
    .connect()
    .then(() => console.log("===>> redis is connected: 6379"));

  app.use(urlencoded({ extended: false }));
  app.use(express.json());
  app.use(
    questionRoute(
      questionController,
      createQuestionService({httpResponse, redisStore:createRedisMethods(redisClient)}),
      questionServiceAdaptor
    )
  );
  app.use(
    Router().get("/", (req: Request, res: Response) =>
      res.status(200).json({
        success: true,
      })
    )
  );

  return app;
};
