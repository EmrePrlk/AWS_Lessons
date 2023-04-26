import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const assetId = event.queryStringParameters?.assetId;

  if (!assetId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'assetId parameter is missing' }),
    };
  }

  try {
    const result = await dynamoDB
      .get({
        TableName: process.env.ASSET_TABLE!,
        Key: { assetId },
      })
      .promise();

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Asset not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};