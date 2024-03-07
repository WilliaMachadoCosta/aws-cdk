
import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs";
import * as cdk from "aws-cdk-lib";
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import { Construct } from "constructs"
import * as cwlogs from "aws-cdk-lib/aws-logs"

interface EcommerceApiStackProps extends cdk.StackProps {
    productsFetchHandler: lambdaNodeJS.NodejsFunction;
    productsAdminHandler: lambdaNodeJS.NodejsFunction;
}

export class EcommerceApiStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: EcommerceApiStackProps) {
        super(scope, id, props)

        const logGroup = new cwlogs.LogGroup(this, "EcommerceApiLogs");
        const api = new apigateway.RestApi(this, 'EcommerceApi', {
            restApiName: "EcommerceApi",
            cloudWatchRole: true,
            deployOptions: {

                accessLogDestination: new apigateway.LogGroupLogDestination(logGroup),
                accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields({
                    httpMethod: true,
                    ip: true,
                    protocol: true,
                    requestTime: true,
                    resourcePath: true,
                    responseLength: true,
                    status: true,
                    caller: true,
                    user: true,


                })
            }
        })

        const productFetchInteration = new apigateway.LambdaIntegration(props.productsFetchHandler);
        const productAdminInteration = new apigateway.LambdaIntegration(props.productsAdminHandler);

        // "/products/"
        const productResource = api.root.addResource("products");
        productResource.addMethod("GET", productFetchInteration)

        // /products/{id}
        const productIdResource = productResource.addResource("{id}");
        productIdResource.addMethod("GET", productFetchInteration)

        // POST /products
        productResource.addMethod("POST", productAdminInteration)
        // PUT /products/{id}

        productIdResource.addMethod("PUT", productAdminInteration)

        // POST /products/{id}
        productIdResource.addMethod("DELETE", productAdminInteration)
    }
}