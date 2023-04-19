import { DynamoDB } from 'aws-sdk';
const dynamodb = new DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME!;

export async function handler(event: any): Promise<any> {
  const httpMethod = event.requestContext.http.method;
  switch (httpMethod) {
    case 'GET':
      return getAsset(event.pathParameters.assetId);
    case 'PUT':
      return putAsset(event.pathParameters.assetId, event.body);
    case 'DELETE':
      return deleteAsset(event.pathParameters.assetId);
    default:
      throw new Error(`Unsupported method "${httpMethod}"`);
  }
}

async function getAsset(assetId: string): Promise<any> {
  const result = await dynamodb
    .get({
      TableName: tableName,
      Key: { assetId }
    })
    .promise();

  return result.Item;
}

async function putAsset(assetId: string, body: any): Promise<any> {
  const params = {
    TableName: tableName,
    Item: {
      assetId,
      ...JSON.parse(body)
    }
  };

  await dynamodb.put(params).promise();

  return { success: true };
}

async function deleteAsset(assetId: string): Promise<any> {
  const params = {
    TableName: tableName,
    Key: {
      assetId
    }
  };

  await dynamodb.delete(params).promise();

  return { success: true };
}

exports.handler = handler;

module.exports = {
    handler
  };
  
