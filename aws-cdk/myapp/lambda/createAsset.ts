import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const { assetId, name, serialNo, assignDate } = JSON.parse(event.body!);

  if (!assetId || !name || !serialNo || !assignDate) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields' }),
    };
  }

  const item = {
    assetId,
    name,
    serialNo,
    assignDate,
  };

  try {
    await dynamoDB
      .put({
        TableName: process.env.ASSET_TABLE!,
        Item: item,
      })
      .promise();

    return {
      statusCode: 201,
      body: JSON.stringify(item),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
