import * as CDK from '@aws-cdk/core';
import * as CodePipeline from '@aws-cdk/aws-codepipeline'
import * as CodePipelineAction from '@aws-cdk/aws-codepipeline-actions'
import { ShellScriptAction, SimpleSynthAction, CdkPipeline } from "@aws-cdk/pipelines";
import * as Stage from './stages'

export interface PipelineProps extends CDK.StackProps {
  github: {
    owner: string
    repository: string
  }
}

export class Pipeline extends CDK.Stack {

public readonly apigatewayEndpoint: CDK.CfnOutput

  constructor(scope: CDK.Construct, id: string, props: PipelineProps) {
    super(scope, id, props) ;     

    const sourceArtifact = new CodePipeline.Artifact()
    const cloudAssemblyArtifact = new CodePipeline.Artifact()
    
    const sourceAction = new CodePipelineAction.GitHubSourceAction({
      actionName: 'GitHub',
      owner: props.github.owner,
      repo: props.github.repository,
      oauthToken: CDK.SecretValue.secretsManager('GitHubToken'),
      output: sourceArtifact,
      trigger: CodePipelineAction.GitHubTrigger.WEBHOOK,
    })

    const synthAction = SimpleSynthAction.standardNpmSynth({
      sourceArtifact, 
      cloudAssemblyArtifact,
      installCommand: 'npm ci && cd lambda && npm ci && cd ..',
      buildCommand: 'npm run build'
  })
    const pipeline = new CdkPipeline(this, 'Pipeline', {
      pipelineName: 'Warehouse-app',
      cloudAssemblyArtifact,
      sourceAction,
      synthAction
  }) 

    const deploy = new Stage.BackendDeploymentStage(this, 'DeployBackend');
    const deployStage = pipeline.addApplicationStage(deploy);


    deployStage.addActions(new ShellScriptAction({
            actionName: 'TestApiGatewayEndpoint',
            useOutputs: {
                ENDPOINT_URL: pipeline.stackOutput(deploy.apiGatewayEndpoint)
            },
            commands: [
                'curl -Ssf $ENDPOINT_URL/products/jackets',
            ]
        }));
}
}
