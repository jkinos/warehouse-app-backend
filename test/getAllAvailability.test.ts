import {fetchAllAvailability,} from '../lambda/functions'

    test('fetch all availability data', async () => {
    const manufacturers = ['reps', 'abiplos', 'nouke', 'derp', 'xoon']
    jest.setTimeout(30000)
    const result = await fetchAllAvailability(manufacturers)
    //console.log(result)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(40000)
})
