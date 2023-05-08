import { aws_apigateway, aws_dynamodb, aws_lambda, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {NodeJSLambdaFunction } from './NodeJSLambdaFunction';
import path = require('path');

function getDefaultLambdaIntegration(handler: aws_lambda.Function): aws_apigateway.LambdaIntegration {
    return new aws_apigateway.LambdaIntegration(handler, {
        requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });
}

export class NewAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const userTable = new aws_dynamodb.Table(this, 'User', {
      partitionKey: { name: 'id', type: aws_dynamodb.AttributeType.STRING },
      tableName: 'user',
      removalPolicy: RemovalPolicy.DESTROY,
    });


    // add new asset Lambda Function

    const addAssetFunction = new NodeJSLambdaFunction(this, 'AddAssetFunction', {
      entry: path.resolve(__dirname, '../src/controller/add-asset.ts'),
      handler: "handler",
      functionName: "AddAsset",
      environment: {
        USER_TABLE_NAME: userTable.tableName
      },
    });
    userTable.grantReadWriteData(addAssetFunction)

    // get all asset Lambda Function

    const getAllAssetFunction = new NodeJSLambdaFunction(this, 'GetAllAssetFunction', {
      entry: path.resolve(__dirname, '../src/controller/get-asset.ts'),
      handler: "handler",
      functionName: "GetAllAsset",
      environment: {
        USER_TABLE_NAME: userTable.tableName
      },
    });
    userTable.grantReadWriteData(getAllAssetFunction)

    // remove asset Lambda Function
    const removeAssetFunction = new NodeJSLambdaFunction(this, 'RemoveAssetFunction', {
      entry: path.resolve(__dirname, '../src/controller/remove-asset.ts'),
      handler: "handler",
      functionName: "RemoveAsset",
      environment: {
        USER_TABLE_NAME: userTable.tableName
      },
    });
    userTable.grantReadWriteData(removeAssetFunction)

    const api = new aws_apigateway.RestApi(this, 'User-RestAPI', {
      restApiName: 'User-RestAPI',
      description: 'User Rest API',
    });

    const addAssetResource = api.root.addResource('add-asset');
    addAssetResource.addMethod('POST', getDefaultLambdaIntegration(addAssetFunction));

    const getAllAssetResource = api.root.addResource('get-asset');
    getAllAssetResource.addResource('{assetId}').addMethod('GET', getDefaultLambdaIntegration(getAllAssetFunction));

  }
}