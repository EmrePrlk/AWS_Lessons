import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    const assetId = event.pathParameters?.assetId;

    const result = await dynamoDB.delete({
      TableName: process.env.DYNAMODB_TABLE_NAME ?? '',
      Key: { assetId }
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Asset deleted successfully',
        data: result
      })
    }
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error'
      })
    }
  }
}
