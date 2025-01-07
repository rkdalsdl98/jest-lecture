import { first, second, third } from "./order"

// 일반 jest로 작성
// test('순서대로 호출 되었는지', () => {
//     const spy1 = jest.fn(first)
//     const spy2 = jest.fn(second)
//     const spy3 = jest.fn(third)

//     spy1()
//     spy2()
//     spy3()

//     // spy1의 호출 순서가 spy2의 호출 순서보다 먼저 인지
//     // = toBeLessThan 보다 작은 지
//     expect(spy1.mock.invocationCallOrder[0])
//     .toBeLessThan(spy2.mock.invocationCallOrder[0])
    
//     // spy3의 호출 순서가 spy2의 호출 순서보다 이후 인지
//     // = toBeGreaterThan 보다 큰 지
//     expect(spy3.mock.invocationCallOrder[0])
//     .toBeGreaterThan(spy2.mock.invocationCallOrder[0])
// })

// jest-extended 사용
test('순서대로 호출 되었는지 2', () => {
    const spy1 = jest.fn(first)
    const spy2 = jest.fn(second)
    const spy3 = jest.fn(third)

    spy1()
    spy2()
    spy3()

    // spy1의 호출 순서가 spy2의 호출 순서보다 먼저 인지
    expect(spy1)
    .toHaveBeenCalledBefore(spy2)
    
    // spy3의 호출 순서가 spy2의 호출 순서보다 이후 인지
    expect(spy3)
    .toHaveBeenCalledAfter(spy2)
})