export enum Category {
    'JACKETS' = "jackets",
    'SHIRTS' = "shirts",
    'ACCESSORIES' = "accessories"
  }
export type Headers = {headers:{[header:string]:string}}

export interface Product {
    id: string,
    type: string,
    name: string,
    color: string[]
    price: number,
    manufacturer: string
    availability?: InstockValue
}

export interface Availability {
    id: string,
    DATAPAYLOAD: string
}

export enum InstockValue {
    'INSTOCK' = 'INSTOCk',
    'OUTOFSTOCK' = 'OUTOFSTOCK',
    'LESSTHAN10' ='LESSTHAN10'
}

 export interface ParsedAvailability {
     AVAILABILITY: { INSTOCKVALUE: InstockValue[] }
 }

export type  NewAvailability = {[id: string]: InstockValue }
