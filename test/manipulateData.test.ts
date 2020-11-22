import { manipulateAvailabilityData} from '../lambda/functions'

const dataInput =

[
    {
    id: "F33561DE3A864F951A",
    DATAPAYLOAD: "<AVAILABILITY> <INSTOCKVALUE>INSTOCK</INSTOCKVALUE> </AVAILABILITY>"
    },
    {
    id: "0E4772C827C4296592FBD",
    DATAPAYLOAD: "<AVAILABILITY> <INSTOCKVALUE>INSTOCK</INSTOCKVALUE> </AVAILABILITY>"
    }
]

const dataOutput = {
    'F33561DE3A864F951A': 'INSTOCK',
    '0E4772C827C4296592FBD':  'INSTOCK'
    }

test('manipulates product availabilityData', async() => {
const data = dataInput
const newData = manipulateAvailabilityData(data)
expect(newData).toEqual(dataOutput)
console.log(newData)
})

