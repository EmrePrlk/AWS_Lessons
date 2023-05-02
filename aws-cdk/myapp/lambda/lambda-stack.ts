import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Duration } from 'aws-cdk-lib';

export class AssetLambdaFunctionStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define DynamoDB table
    const assetTable = new dynamodb.Table(this, 'AssetTable', {
      partitionKey: {
        name: 'assetId',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      tableName: 'Asset',
    });

    // Define Lambda function
    const assetLambda = new lambda.Function(this, 'AssetLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'asset.handler',
      timeout: Duration.seconds(10),
      environment: {
        ASSET_TABLE_NAME: assetTable.tableName,
      },
    });

    // Grant permission to the Lambda function to access DynamoDB
    assetTable.grantReadWriteData(assetLambda);

    // Add IAM policy statement to allow the Lambda function to write CloudWatch logs
    assetLambda.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
        resources: ['arn:aws:logs:*:*:*'],
      })
    );
  }
}
