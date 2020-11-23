import * as CDK from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import { Duration } from '@aws-cdk/core';

  export class LambdaStack extends CDK.Stack {
    public readonly apiGatewayEndpoint: CDK.CfnOutput

    constructor(scope: CDK.Construct, id: string, props?: CDK.StackProps) {
      super(scope, id, props);

      const getProducts = new lambda.Function(this, 'GetProducts', {
        runtime: lambda.Runtime.NODEJS_10_X,    
        code: lambda.Code.fromAsset('lambda'),  
        handler: 'handler.getProducts',
        timeout: Duration.seconds(30),
        memorySize: 200
      });

      const gateway = new apigw.LambdaRestApi(this, 'Warehouse-App-Endpoint', {
        handler: getProducts,
        proxy: false
      });
      const products = gateway.root.addResource('products');
      const category = products.addResource('{category}');
      category.addMethod('GET');

      this.apiGatewayEndpoint = new CDK.CfnOutput(this, 'GatewayUrl', {
        value: gateway.url
      }); 
    }
}