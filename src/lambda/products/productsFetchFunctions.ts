import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function handler(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {

  const lambdaRequestId = context.awsRequestId;
  const apiRequestId = event.requestContext.requestId;

  console.log(`APIGatewayEvent RequestId : ${lambdaRequestId} - apiRequestId ${apiRequestId}`)

  const method = event.httpMethod;

  if (event.resource === '/products') {
    if (method === 'GET') {
      console.log('get')

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "GET Products -ok"
        })
      }
    }
  } else if (event.resource === "/products/{id}") {
    const productId = event.pathParameters!.id as string
    console.log(`GET /products/${productId}`)
    return {
      statusCode: 200,
      body: "GET /products / {id}"
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "BED Request Products"
    })
  }
}