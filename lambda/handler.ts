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
  try {
    const category = checkCategoryType(event.pathParameters?.category)
    const products = await fetchProducts(category)
    const manufacturers = getManufacturers(products)
    const availability = await fetchAllAvailability(manufacturers)
    const newAvailability =  manipulateAvailabilityData(availability)
    const newProducts = attachAvailabilityToProduct(products, newAvailability)
    const result = { 
      manufacturers: manufacturers,
      products: newProducts 
    }
  
  return {
        statusCode: 200,
        headers: { 
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Expose-Headers': 'Date' },
        body: JSON.stringify(result, null, 2)
      }
    } catch (error) {
      if(error.message ==='Unknown endpoint'){
        return {
          statusCode: 400,
          headers: { 
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(error, null,)
        }
      }
        throw(error)
      }
}