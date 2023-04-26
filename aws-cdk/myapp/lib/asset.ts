import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const dynamo = new DocumentClient();
  const assetId = event.pathParameters?.assetId;
  const params = {
    TableName: process.env.TABLE_NAME || '',
    Key: { assetId },
  };

  switch (event.httpMethod) {
    case 'GET':
      const response = await dynamo.get(params).promise();
      if (!response.Item) {
        return { statusCode: 404, body: 'Asset not found' };
      }
      return { statusCode: 200, body: JSON.stringify(response.Item) };
    case 'PUT':
      const { name, serialNo, assignDate } = JSON.parse(event.body || '');
      await dynamo.put({ ...params, Item: { assetId, name, serialNo, assignDate } }).promise();
      return { statusCode: 204 };
    case 'DELETE':
        await dynamo.delete(params).promise();
        return { statusCode: 204 };
      default:
        return { statusCode: 400, body: 'Invalid HTTP method' };
    }
  });
  
  handler.use(
    cors({
      credentials: true,
    })
  );
  
