import {convertXML, fetchAvailability} from '../lambda/functions'

describe('is able to parse XML data', () => {
    test('parses XML to javascript object', () => {

        const xml = `<?xml version="1.0" encoding="UTF-8" ?>
            <user id="1">
                <name>John Doe</name>
                <email>john.doe@example.com</email>
                <roles>
                    <role>Member</role>
                    <role>Admin</role>
                </roles>
                <admin>true</admin>
            </user>`

        const object = convertXML(xml)
        expect(Object.prototype.toString.call(object)).toBe('[object Object]')

    })

    test('converts legacy-api availability XML to object', async() => {
        const manufacturer = 'reps'
        const data = await fetchAvailability(manufacturer)
        const object = convertXML(data[0]['DATAPAYLOAD'])
        expect(Object.prototype.toString.call(object)).toBe('[object Object]')
        console.log(object)
        
        if(object) {
        const instockValue = object['AVAILABILITY']['INSTOCKVALUE'][0]
        expect(instockValue).toBeDefined;
        expect(instockValue).toEqual('INSTOCK' || 'OUTOFSTOCK' ||'LESSTHAN10')
        }else {
            throw new Error("XMLConvert didn't return an object!")
        }
        })
})

