import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';





export class LambdaSampleStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler'
    });



    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: hello
    })

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'LambdaSampleQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
