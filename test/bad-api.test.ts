import { Category, Headers } from '../lambda/types'
import {baseurl} from '../lambda/constants'
import axios from 'axios'

const getProducts = async (category: Category, headers?: Headers ) => {
    return await axios.get(`${baseurl}/products/${category}`,headers)
 }

const getAvailability = async (manufacturer: string, headers?: Headers ) => {
   return await axios.get(`${baseurl}/availability/${manufacturer}`, headers)
 }

describe('is able to request from "bad-api"- endpoint', () => {

    test('getProducts succeeds', async () => {
        const response = await getProducts(Category.JACKETS)
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toContain("application\/json")
        const data = await response.data
        expect(Array.isArray(data)).toBe(true)
        expect(data[0].id).toBeDefined() // fails if  object is empty or field 'id' missing

        const response2 = await getProducts(Category.SHIRTS)
        expect(response2.status).toBe(200)

        const response3 = await getProducts(Category.ACCESSORIES)
        expect(response3.status).toBe(200)
    })

    test('getAvailability succeeds', async () => {
        const manufacturer = 'reps'
        const response = await getAvailability(manufacturer)
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toContain("application\/json")
        const data = await response.data.response
        expect(Array.isArray(data)).toBe(true)
        expect(data[0].id).toBeDefined()
    })
})

describe('bad-api fails with error-mode request header', () => {

    // request headers to cause forced error mode on "bad-api" -server
    const forcedErrorHeaders: Headers= { headers: {'X-Force-Error-Mode': 'all'}}

    // maybe x-force-error-mode -header is not available for GET products/:category?
    // could not get request/test to fail
    /*test("getProductsERRORMODE fails" , async() => {
        const response = await getProducts(Product.JACKETS, forcedErrorHeaders)
        expect(response.status).toBe(200)
        const data = response.data
        expect(data[0].id).not.toBe(undefined)
    })*/

    test("getAvailabilityERRORMODE fails" ,async () => {
        const manufacturer = 'reps'
        const response = await getAvailability(manufacturer, forcedErrorHeaders)
        expect(response.status).toBe(200) // forced error mode returns status 200
        expect(response.headers['content-type']).toContain("application\/json")
        const data = await response.data.response
        // expect(Array.isArray(data)).toBe(false) // in forced-error-mode server returns string "[]"
        expect(data[0].id).toBe(undefined) //  first object is empty or field 'id' missing
    })
})
