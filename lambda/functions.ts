import axios from 'axios'
import { Category, Headers, Product, Availability, NewAvailability, ParsedAvailability } from './types'
import {baseurl} from './constants'

const errorMsg502 = 'The server received an invalid response from the upstream server it accessed in attempting to fulfill the request.'

export const fetchProducts = async (category: Category, headers?: Headers): Promise<Product[]>=> {
  try {
    const response =  await axios.get(`${baseurl}/products/${category}`,headers)
    if(!response.data[0].id){
      throw new Error(errorMsg502)
    }
    return response.data
  }
  catch (error) {
    throw error
  }
}

export const fetchAvailability = async (manufacturer: string, headers?: Headers):Promise<Availability[]> => {
  try {
    const response =  await axios.get(`${baseurl}/availability/${manufacturer}`, headers)
    if(!response.data.response[0].id){
      throw new Error(errorMsg502)
    }
    return response.data.response
  }
  catch (error) {
    throw error
  }
}

export const getManufacturers =  (products: Product[]):string[] => {
const manufacturers: Set<string> = new Set()
products.forEach((product:Product) => manufacturers.add(product.manufacturer))
return Array.from(manufacturers)
}

export const fetchAllAvailability = async (manufacturers: string[]):Promise<Availability[]> => {
const promises = manufacturers.map( manufacturer => fetchAvailability(manufacturer))
const resolved = await Promise.all(promises)
const result:Availability[] = []
return result.concat(...resolved)
}

export const manipulateAvailabilityData = (dataOld: Availability[]) => {
    let dataNew: NewAvailability  = {}
    dataOld.map(data => {
        const availabilityObj = parseAvailability(data.DATAPAYLOAD)
        dataNew[data.id] = availabilityObj.AVAILABILITY.INSTOCKVALUE[0]
    })
    return dataNew
}

export const parseAvailability = (availability: string):ParsedAvailability => {
const Obj = convertXML(availability)
return checkAvailabilityType(Obj)
}

export const convertXML = (xml:string)=> {
    const xml2js = require('xml2js')
    let object
    xml2js.parseString(xml, (err: Error, result: unknown) => {
      if(err) {
          throw err;
      }
      object = result
    });
    return object
    }

export const checkAvailabilityType = (availability: any): ParsedAvailability => {
    const instockValue = availability.AVAILABILITY.INSTOCKVALUE[0]
    switch (instockValue){
    case 'INSTOCK':
        return availability
        case 'OUTOFSTOCK':
        return availability
        case 'LESSTHAN10':
            return availability
            default:
                throw Error("Malformed instock value type")
            }
}

export const attachAvailabilityToProduct = (
  products: Product[], availability: NewAvailability): Product[] => {
  products.map(product =>  {
    product.availability = availability[product.id.toUpperCase()]
})
  return products
}