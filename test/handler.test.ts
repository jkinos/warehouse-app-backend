import { getProducts } from '../lambda/handler'


describe('lambda fuction retrieves data from the legacy apis and returns new data', () => {
    test('when category is jackets', async() => {
        jest.setTimeout(15000)
        
        const event = {pathParameters: {category : 'jackets'}}
        // @ts-ignore
        const res = await getProducts(event,{})
        //console.log(res)
        expect(res.statusCode).toBe(200)
        const body = JSON.parse(res.body)
        expect(body.products[0].availability).toBeDefined()
        expect(body.manufacturers.lenght !== 0)    
        })
})

