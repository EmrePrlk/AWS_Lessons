import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Duration } from 'aws-cdk-lib';
import { RemovalPolicy } from 'aws-cdk-lib';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from "constructs";


export class MyAppStack extends cdk.Stack {
  public readonly assetTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.assetTable = new Table(this, 'AssetTable', {
      partitionKey: { name: 'assetId', type: dynamodb.AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });
  }
}
