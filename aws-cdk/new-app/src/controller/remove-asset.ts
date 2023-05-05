// // Delete it all if fails
// import middy from "@middy/core";
// import httpErrorHandler from "@middy/http-error-handler";
// import httpHeaderNormalizer from '@middy/http-header-normalizer';
// import httpUrlEncodePathParser from '@middy/http-urlencode-path-parser';
// import inputOutputLogger from '@middy/input-output-logger';
// import { Context, Handler } from 'aws-lambda';
// import pino from 'pino';
// import { userService } from '../config/createUserServiceConfig';

// const logger = pino()

// interface RemoveAssetRequest {
//     pathParameters: {
//         assetId: string
//     }
// }


// const removeAsset: Handler<RemoveAssetRequest> = async (event) => {
//     const { assetId } = event.pathParameters
//     const user = await userService.getUser(assetId)

//     const response = {
//         statusCode: 200,
//         body: JSON.stringify(user),
//     }
//     return response
// }

// export const handler = middy(removeAsset)
//     .use(inputOutputLogger({
//         logger: (request) => {
//             const child = logger.child(request.context)
//             child.info(request.event ?? request.response)
//         },
//         awsContext: true
//     }))
//     .use(httpHeaderNormalizer())
//     .use(httpUrlEncodePathParser())
//     .use(httpErrorHandler())