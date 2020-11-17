#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LambdaStack } from '../lib/lambda-stack';
import { config } from '../config'

const app = new cdk.App();
new LambdaStack(app, 'WarehouseAppLambdaStack', config);
