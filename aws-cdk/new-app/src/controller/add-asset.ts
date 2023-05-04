import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import httpJsonBodyParser from '@middy/http-json-body-parser';
import inputOutputLogger from '@middy/input-output-logger';
import validator from "@middy/validator";
import { transpileSchema } from '@middy/validator/transpile';
import { Handler } from 'aws-lambda';
import pino from 'pino';
import { userService } from '../config/createUserServiceConfig';
import { UserCreateDTO } from '../dto/UserCreateDTO';

const logger = pino();

const addAssetDTOSchema = transpileSchema({
    type: 'object',
    required: ['body'],
    properties: {
        body : {
            type: 'object',
            required: ['username', 'email'],
            properties: {
                assetId: {
                    type: 'string'
                  },
                  name: {
                    type: 'string'
                  },
                  serialNo: {
                    type: 'string'
                  },
                  assignDate: {
                    type: 'date'
                  }
            },
            additionalProperties: false
        }
    },
  })

interface AddAssetHandler {
    body: AddAssetDTO
}

Export const lambdaHandler:Handler<AddAssetHandler> = async (event, _) => {
    const { body } = event

    await userService.addAsset(body)
    const response = {
        statusCode: 201,
        body: 'OK',
    }
    return response
}

export const handler = middy(lambdaHandler)
    .use(
        inputOutputLogger({
            logger: (request) => {
                const child = logger.child(request.context)
                child.info(request.event ?? request.response)
            },
            awsContext: true
        })
    )
    .use(httpHeaderNormalizer())
    .use(httpJsonBodyParser())
    .use(validator({eventSchema: addAssetDTOSchema}))
    .use(httpErrorHandler())
