import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Duration } from 'aws-cdk-lib';

export class MyStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create dynamodb table
    const table = new dynamodb.Table(this, 'my-table', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // create lambda functions
    const getFunction = new lambda.Function(this, 'get-function', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/get'),
      timeout: Duration.seconds(30),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    const putFunction = new lambda.Function(this, 'put-function', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/put'),
      timeout: Duration.seconds(30),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    const deleteFunction = new lambda.Function(this, 'delete-function', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/delete'),
      timeout: Duration.seconds(30),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    // create api gateway
    const api = new apigateway.RestApi(this, 'my-api', {
      restApiName: 'My API',
    });

    const items = api.root.addResource('items');
    items.addMethod('GET', new apigateway.LambdaIntegration(getFunction));
    items.addMethod('PUT', new apigateway.LambdaIntegration(putFunction));
    items.addMethod('DELETE', new apigateway.LambdaIntegration(deleteFunction));
  }
}
