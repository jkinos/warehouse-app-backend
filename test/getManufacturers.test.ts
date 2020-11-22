import {fetchProducts, getManufacturers} from '../lambda/functions'
import {Category} from '../lambda/types'

const products =
[
    {
    id: "44ca535c73191c7cd81",
    type: "accessories",
    name: "XIUONI STRONG",
    color: [
    "red"
    ],
    price: 13,
    manufacturer: "xoon"
    },
    {
    id: "0f44a038ae52b42c9cb1",
    type: "accessories",
    name: "OPIEWH FANTASY",
    color: [
    "red",
    "purple"
    ],
    price: 85,
    manufacturer: "reps"
    },
    {
    id: "7e780fabedccc19b19",
    type: "accessories",
    name: "XIUHUNK SPORT XTREME",
    color: [
    "blue"
    ],
    price: 37,
    manufacturer: "xoon"
    },
    {
    id: "7f40776ca25ec1c0abc",
    type: "accessories",
    name: "IUPOL MAGIC RAPTOR",
    color: [
    "yellow",
    "blue"
    ],
    price: 97,
    manufacturer: "xoon"
    }
]

    test('return a list of manufacturers', () => {
        const manufacturers = getManufacturers(products)
        console.log(manufacturers)
        expect(Array.isArray(manufacturers)).toBeTruthy()
    })

    test('return a list of all manufacturers', async () => {
        const products = await fetchProducts(Category.JACKETS)
        const manufacturers = getManufacturers(products)
        console.log(manufacturers)
        expect(Array.isArray(manufacturers)).toBeTruthy()
    })
