import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as path from 'path';
import { Construct } from 'constructs';


export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const assetTable = new dynamodb.Table(this, 'AssetTable', {
      partitionKey: { name: 'assetId', type: dynamodb.AttributeType.STRING },
      tableName: 'Asset',
    });

    const lambdaCode = lambda.Code.fromAsset(path.join(__dirname, '../lambda'));
    const functionName1 = 'writeAsset';
    const lambda1 = new lambda.Function(this, functionName1, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'writeAsset.handler',
      code: lambdaCode,
      environment: {
        TABLE_NAME: assetTable.tableName,
      },
    });

    const functionName2 = 'readAsset';
    const lambda2 = new lambda.Function(this, functionName2, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'readAsset.handler',
      code: lambdaCode,
      environment: {
        TABLE_NAME: assetTable.tableName,
      },
    });

    const functionName3 = 'deleteAsset';
    const lambda3 = new lambda.Function(this, functionName3, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'deleteAsset.handler',
      code: lambdaCode,
      environment: {
        TABLE_NAME: assetTable.tableName,
      },
    });

    assetTable.grantReadWriteData(lambda1);
    assetTable.grantReadData(lambda2);
    assetTable.grantReadWriteData(lambda3);
  }
}
