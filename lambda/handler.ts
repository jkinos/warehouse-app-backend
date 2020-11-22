import { APIGatewayProxyResult, APIGatewayEvent, Context } from "aws-lambda";
import { fetchProducts, fetchAllAvailability, getManufacturers, manipulateAvailabilityData, attachAvailabilityToProduct} from './functions'
import { Category } from './types'

export const checkCategoryType = (category: any): Category => {
  switch (category){
    case Category.JACKETS: 
    return category
    case Category.ACCESSORIES:
      return category
      case Category.SHIRTS:
        return category
        default:
          throw new Error('Unknown endpoint');        
  }
}

export const getProducts = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  let category
try {
  try {
  category = checkCategoryType(event.pathParameters?.category)
  }catch (error) {
    console.error(error)
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 404,
      body: JSON.stringify(error, null, 2)
    }
  }
 
  const products = await fetchProducts(category)
  const manufacturers = getManufacturers(products)
  const availability = await fetchAllAvailability(manufacturers)
  const newAvailability =  manipulateAvailabilityData(availability)
  const result = attachAvailabilityToProduct(products, newAvailability)
  
  return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(result, null, 2)
      }
    }catch (error) {
      console.error(error)
        return {
          statusCode: 500,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify(error, null,2 )
        }
      }
}