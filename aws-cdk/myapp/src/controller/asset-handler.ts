import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const dynamoDb = new DynamoDB.DocumentClient();
const tableName = process.env.ASSET_TABLE_NAME || '';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = event.body;
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing request body' }),
    };
  }

  let asset;
  try {
    asset = JSON.parse(body);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request body' }),
    };
  }

  const params = {
    TableName: tableName,
    Item: {
      assetId: asset.assetId,
      name: asset.name,
      serialNo: asset.serialNo,
      assignDate: asset.assignDate,
    },
  };

  try {
    await dynamoDb.put(params).promise();
  
    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
  } catch (err) {
    console.error(err);
  
    return {
      statusCode: (err as any).statusCode || 500,
      body: 'Error saving asset',
    };
  }
  
};
