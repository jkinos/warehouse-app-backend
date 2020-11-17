import * as CDK from '@aws-cdk/core';
import { LambdaStack } from './lambda-stack'


export class BackendDeploymentStage extends CDK.Stage {
    public readonly apiGatewayEndpoint: CDK.CfnOutput

    constructor(scope: CDK.Construct, id: string, props?: CDK.StageProps) {
        super(scope, id, props);
        
        const backendDeployment = new LambdaStack(this, 'warehouse-app-backend');
        this.apiGatewayEndpoint = backendDeployment.apiGatewayEndpoint
    }
  }
  
  