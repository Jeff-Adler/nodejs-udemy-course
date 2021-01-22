const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

// test('Should calculate total with default', () => {
//     const total = calculateTip(10)
//     expect(total).toBe(12.5)
// })

// test('Should convert 32 F to 0 C', () =>{
//     const temperatureInCelcius = fahrenheitToCelsius(32)
//     expect(temperatureInCelcius).toBe(0)
// })

// test('Should convert 0 C to 32 F', () =>{
//     const temperatureInFehrenheit = celsiusToFahrenheit(0)
//     expect(temperatureInFehrenheit).toBe(32)
// })

// done parameter signals to jest that its an async function, and that it should not run the test until done() is called
// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })

// test('Should add two numbers', (done) => {
//     add(2, 3).then((sum) => {
//         expect(sum).toBe(5)
//         done()
//     })
// })

// test('Should add two numbers async/await', async () => {
//     const sum = await add(10, 22)
//     expect(sum).toBe(32)
// })