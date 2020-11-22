import {attachAvailabilityToProduct} from '../lambda/functions'
import {InstockValue} from '../lambda/types'

const availability = {
    '0E4772C827C4296592FBD':  InstockValue.INSTOCK,
    F33561DE3A864F951A: InstockValue.OUTOFSTOCK
    }

const products = [

{
    id: "f33561de3a864f951a",
    type: "accessories",
    name: "XIUONI STRONG",
    color: [
    "red"
    ],
    price: 13,
    manufacturer: "xoon"
    },
    {
    id: "0e4772c827c4296592fbd",
    type: "accessories",
    name: "OPIEWH FANTASY",
    color: [
    "red",
    "purple"
    ],
    price: 85,
    manufacturer: "reps"
    }
]

const output = [

    {
        id: "F33561DE3A864F951A",
        type: "accessories",
        name: "XIUONI STRONG",
        color: [
        "red"
        ],
        price: 13,
        manufacturer: "xoon",
        availability: 'OUTOFSTOCK'
        },
        {
        id: "0E4772C827C4296592FBD",
        type: "accessories",
        name: "OPIEWH FANTASY",
        color: [
        "red",
        "purple"
        ],
        price: 85,
        manufacturer: "reps",
        availability: 'INSTOCK'

        }
    ]

    test('attaches availability to product', () => {
        const result = attachAvailabilityToProduct(products, availability)
        expect(result[0].availability).toEqual('OUTOFSTOCK')
        console.log(result)
    })