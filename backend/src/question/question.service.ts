import { Question } from "./model/question.model";
import { createQuestion } from "./services/createQuestion";
import { deleteQuestion } from "./services/deleteQuestion";
import { updateQuestion } from "./services/updateQuestion";
import { getQuestionByQueryOrId } from "./services/getQuestion";

export interface IService {
  httpResponse?: any;
  model?: any;
  redisStore?: any;
  searchDb?: any
}

export const createQuestionService = ({
  httpResponse,
  redisStore,
  model = Question,
  searchDb= searchDbFunc
}: IService) => {
  return {
    createQuestion: createQuestion(httpResponse, model),
    updateQuestion: updateQuestion(httpResponse, model),
    getQuestion: getQuestionByQueryOrId ({ httpResponse, model, redisStore, searchDb }),
    deleteQuestion: deleteQuestion(httpResponse, model),
  };
};




interface ISearchDB {
  pageNum?: number;
  search?: string;
  model: any;
  field: string;
}

export const searchDbFunc = async ({ pageNum, search, model, field }: ISearchDB) => {
  const page = pageNum || 1;
  const criteria = search ? { [field]: { $regex: search, $options: "i" } } : {};
  var perPage = 5;
  const totalDocs = await model.find({ isDeleted: false, ...criteria }).count();
  const totalPage = Math.ceil(totalDocs / perPage);
  return model
    .find({ isDeleted: false, ...criteria })
    .sort({ date: "asc" })
    .limit(perPage)
    .skip(perPage * (page - 1))
    .then((docs: any) => {
      return {
        docs,
        totalDocs,
        page,
        totalPage,
        hasNextPage: page < totalPage,
        hasPrevPage: page > 1,
      };
    });
};
