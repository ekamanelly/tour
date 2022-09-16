git 
echo "please, what the resource name ?"
read res


# if [ -d "/${res}"]; then
#     echo "Directory /${res} exists." 
# else
#     echo "Error: Directory /${res} does not exists."
# fi
#  && echo "No such directory" && exit
mkdir ${res}
mkdir "${res}/helper"
mkdir "${res}/test"
mkdir "${res}/model"
touch "${res}/test/${res}.service.test.ts"
touch "${res}/test/${res}.route.test.ts"
touch "${res}/test/${res}.serviceAdaptor.test.ts"
touch "${res}/test/${res}.controller.test.ts"
touch "${res}/model/${res}.model.ts"
touch "${res}/${res}.controller.ts"
touch "${res}/${res}.service.ts"
touch "${res}/${res}.route.ts"
touch "${res}/${res}.serviceAdaptor.ts"


# write to file 
echo """
import express, { Router } from "express";

export const ${res}Route = (
  ${res}Controller: any,
  ${res}Services: any,
  ${res}ServiceAdaptor: any
) => {
  const handler = ${res}ServiceAdaptor(${res}Services);
  return Router().all("/api/posts", ${res}Controller(handler));
};
""" >> ${res}/${res}.route.ts


echo """
import { Request, Response } from "express";
export function ${res}Controller(handler: any) {
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
""" >> ${res}/${res}.controller.ts

echo """

export function ${res}ServiceAdaptor(${res}Service: any) {
    return (req: Request) => {
      switch (req.method) {
        case 'GET':
          return ${res}Service.get${res}(req);
        case 'POST':
        case 'PATCH':
        case 'DELETE':
        // return 'not implemented'
        default:
          return {
            headers: {
              'Content-Type': 'application/json',
            },
            statusCode: 405,
            errorMessage: '\${req.method} method not allowed.',
          };
      }
    };
  }
""" >> ${res}/${res}.serviceAdaptor.ts


echo """
import express, { Router } from "express";

export const ${res}Route = (
  ${res}Controller: any,
  ${res}Services: any,
  ${res}ServiceAdaptor: any
) => {
  const handler = ${res}ServiceAdaptor(${res}Services);
  return Router().all('/api/${res}s', ${res}Controller(handler));
};
""" >> ${res}/${res}.route.ts


echo """
describe('the ${res}-service', () => {
  afterEach(jest.clearAllMocks);
  it('should respond ', async () => {

   })
  });
""" >> ${res}/test/${res}.service.test.ts

echo """
describe('the ${res}-serviceAdaptor', () => {
  afterEach(jest.clearAllMocks);
  it('should respond ', async () => {

   })
  });
""" >> ${res}/test/${res}.serviceAdaptor.test.ts
echo """
describe('the ${res}-router', () => {
  afterEach(jest.clearAllMocks);
  it('should respond ', async () => {

   })
  });
""" >> ${res}/test/${res}.route.test.ts
echo """
describe('the ${res}-controller', () => {
  afterEach(jest.clearAllMocks);
  it('should respond ', async () => {

   })
  });
""" >> ${res}/test/${res}.controller.test.ts








