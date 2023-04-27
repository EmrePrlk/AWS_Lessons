import { Stack, StackProps } from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from "constructs";
import { get } from 'env-var'



export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const TABLE_NAME = get('TABLE_NAME').required().asString()

    const assetFunction = new lambda.Function(this, 'AssetFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'asset.handler',
      code: lambda.Code.fromAsset('functions/asset'),
      environment: {
        TABLE_NAME: TABLE_NAME,
      },
    });

    const api = new apigateway.RestApi(this, 'AssetApi');

    const assetResource = api.root.addResource('asset');
    assetResource.addMethod('GET', new apigateway.LambdaIntegration(assetFunction));
    assetResource.addMethod('PUT', new apigateway.LambdaIntegration(assetFunction));
    assetResource.addMethod('DELETE', new apigateway.LambdaIntegration(assetFunction));
  }
}
