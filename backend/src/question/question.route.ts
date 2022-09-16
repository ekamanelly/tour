
import express, { Router } from "express";
export const questionRoute = (
  questionController: any,
  questionServices: any,
  questionServiceAdaptor: any
) => {
  const router = Router()

  
  const handler = questionServiceAdaptor(questionServices);
  router.all('/api/questions', questionController(handler));
  router.get('/api/questions/:_id', questionController(handler));
  router.patch('/api/questions/:_id', questionController(handler));
  router.delete('/api/questions/:_id', questionController(handler));
  return router
};

