import { Stack, StackProps, Construct } from '@aws-cdk/core';
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb';
import { Function, Code, Runtime } from '@aws-cdk/aws-lambda';
import { LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';

export class MyappStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // DynamoDB table
    const table = new Table(this, 'MyTable', {
      partitionKey: { name: 'assetId', type: AttributeType.STRING }
    });

    // Lambda function to handle GET request
    const getAssetLambda = new Function(this, 'GetAssetFunction', {
      runtime: Runtime.NODEJS_14_X,
      handler: 'src/get-asset.handler',
      code: Code.fromAsset('lambda/get-asset'),
      environment: {
        TABLE_NAME: table.tableName
      }
    });

    // Lambda function to handle PUT request
    const putAssetLambda = new Function(this, 'PutAssetFunction', {
      runtime: Runtime.NODEJS_14_X,
      handler: 'src/get-asset.handler',
      code: Code.fromAsset('lambda/put-asset'),
      environment: {
        TABLE_NAME: table.tableName
      }
    });

    // Lambda function to handle DELETE request
    const deleteAssetLambda = new Function(this, 'DeleteAssetFunction', {
      runtime: Runtime.NODEJS_14_X,
      handler: 'src/get-asset.handler',
      code: Code.fromAsset('lambda/delete-asset'),
      environment: {
        TABLE_NAME: table.tableName
      }
    });

    // API Gateway
    const api = new RestApi(this, 'MyApi');

    // API Gateway resources and methods
    const assets = api.root.addResource('assets');
    assets.addMethod('GET', new LambdaIntegration(getAssetLambda));
    assets.addMethod('PUT', new LambdaIntegration(putAssetLambda));
    assets.addMethod('DELETE', new LambdaIntegration(deleteAssetLambda));
  }
}
