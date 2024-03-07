import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function handler(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {

  const lambdaRequestId = context.awsRequestId;
  const apiRequestId = event.requestContext.requestId;

  console.log(`APIGatewayEvent RequestId : ${lambdaRequestId} - apiRequestId ${apiRequestId}`)

  const method = event.httpMethod;

  if (event.resource === '/products') {
    console.log('POST  /products')
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "POST Products -ok"
      })
    }
  } else if (event.resource === "/products/{id}") {
    const productId = event.pathParameters!.id as string
    console.log(` /products/${productId}`)

    if (event.httpMethod === "PUT") {
      console.log(`PUT /products/${productId}`)
      return {
        statusCode: 200,
        body: `PUT /products/${productId}`
      }

    } else if (event.httpMethod === "DELETE") {
      console.log(`DELETE /products/${productId}`)
      return {
        statusCode: 200,
        body: `DELETE /products/${productId}`
      }
    }

  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "BED Request Products"
    })
  }
}