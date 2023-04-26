import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class ApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const assetFunction = new lambda.Function(this, 'AssetFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'asset.handler',
      code: lambda.Code.fromAsset('functions/asset'),
      environment: {
        TABLE_NAME: props.env?.TABLE_NAME as string,
      },
    });

    const api = new apigateway.RestApi(this, 'AssetApi');

    const assetResource = api.root.addResource('asset');
    assetResource.addMethod('GET', new apigateway.LambdaIntegration(assetFunction));
    assetResource.addMethod('PUT', new apigateway.LambdaIntegration(assetFunction));
    assetResource.addMethod('DELETE', new apigateway.LambdaIntegration(assetFunction));
  }
}
