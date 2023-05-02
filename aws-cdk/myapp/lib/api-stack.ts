import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Stack, StackProps } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as constructs from 'constructs';




export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB table
    const table = new dynamodb.Table(this, 'AssetTable', {
      partitionKey: { name: 'assetId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand pricing
    });

    // IAM role for accessing the DynamoDB table from the Lambda functions
    const tableAccessRole = new iam.Role(this, 'AssetTableAccessRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });
    tableAccessRole.addToPolicy(new iam.PolicyStatement({
      actions: ['dynamodb:*'],
      resources: [table.tableArn],
    }));

    // Lambda functions
    const createAssetLambda = new lambda.Function(this, 'CreateAssetLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda/createAsset'),
      handler: 'index.handler',
      role: tableAccessRole,
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    const readAssetLambda = new lambda.Function(this, 'ReadAssetLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda/readAsset'),
      handler: 'index.handler',
      role: tableAccessRole,
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    const deleteAssetLambda = new lambda.Function(this, 'DeleteAssetLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda/deleteAsset'),
      handler: 'index.handler',
      role: tableAccessRole,
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    // API Gateway
    const restApi = new apigateway.RestApi(this, 'AssetApi', {
      restApiName: 'Asset API',
    });

    const createAssetIntegration = new apigateway.LambdaIntegration(createAssetLambda);
    const createAssetResource = restApi.root.addResource('assets');
    createAssetResource.addMethod('POST', createAssetIntegration);

    const readAssetIntegration = new apigateway.LambdaIntegration(readAssetLambda);
    const readAssetResource = restApi.root.addResource('assets');
    readAssetResource.addMethod('GET', readAssetIntegration);

    const deleteAssetIntegration = new apigateway.LambdaIntegration(deleteAssetLambda);
    const deleteAssetResource = restApi.root.addResource('assets');
    deleteAssetResource.addMethod('DELETE', deleteAssetIntegration);

    // Output the API URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: restApi.url,
      exportName: 'AssetApiUrl',
    });
  }
}
