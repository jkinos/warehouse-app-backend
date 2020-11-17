import * as CDK from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';

  export class LambdaStack extends CDK.Stack {
    public readonly apiGatewayEndpoint: CDK.CfnOutput

    constructor(scope: CDK.Construct, id: string, props?: CDK.StackProps) {
      super(scope, id, props);

      const getProducts = new lambda.Function(this, 'GetProducts', {
        runtime: lambda.Runtime.NODEJS_10_X,    
        code: lambda.Code.fromAsset('lambda'),  // code loaded from "lambda" directory
        handler: 'getProducts.handler'                
      });

      const gateway = new apigw.LambdaRestApi(this, 'Endpoint', {
        handler: getProducts
      });

      this.apiGatewayEndpoint = new CDK.CfnOutput(this, 'GatewayUrl', {
        value: gateway.url
      });
  
    }
}