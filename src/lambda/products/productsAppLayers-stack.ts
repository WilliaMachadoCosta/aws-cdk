import * as cdk from "aws-cdk-lib"
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as ssm from "aws-cdk-lib/aws-ssm"
import { Construct } from "constructs"



export class ProductsAppLayersStack extends cdk.Stack {
  readonly productsLayers: lambda.LayerVersion

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    this.productsLayers = new lambda.LayerVersion(this, "ProductsAppLayer", {
      code: lambda.Code.fromAsset('lambda/products/layers/productsLayer'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_20_X],
      layerVersionName: "ProductsAppLayer",
      removalPolicy: cdk.RemovalPolicy.RETAIN

    })
    new ssm.StringParameter(this, "ProductsLayerVersionArn", {
      parameterName: "ProductsLayerVersionArn",
      stringValue: this.productsLayers.layerVersionArn
    })
  }
}