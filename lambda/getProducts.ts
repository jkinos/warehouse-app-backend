import { APIGatewayProxyResult, APIGatewayEvent, Context } from "aws-lambda";

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log('Hello World!');
    return {
        statusCode: 200,
        body: JSON.stringify(event, null, 2)
      }
}