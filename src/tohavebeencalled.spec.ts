import { cal, obj } from "./tobe"

// 단순히 함수가 호출 되었는지
test("cal 함수가 호출 되었는가", () => {
    // 일반적으로 js는 함수를 추적 할 수 없기 때문에 jest.fn으로 호출을 감시하도록 함
    // 관례상 이러한 함수는 spy가 붙음
    const sumSpy = jest.fn(cal)

    // cal 함수의 동작을 그대로 복사한 sumSpy를 호출
    sumSpy(1,2)
    expect(sumSpy).toHaveBeenCalled()
})

// 함수가 몇 번 호출되었는지
test("cal 함수가 n번 호출 되었는가", () => {
    const sumSpy = jest.fn(cal)
    sumSpy(1,2)
    sumSpy(1,2)
    sumSpy(1,2)
    expect(sumSpy).toHaveBeenCalledTimes(3)
})

// 함수가 어떤 인수를 받아 호출되었는지
test("cal 함수가 1,2를 매개값으로 호출 되었는가", () => {
    const sumSpy = jest.fn(cal)
    sumSpy(1,2)
    expect(sumSpy).toHaveBeenCalledWith(1,2)
})

// spyon은 객체의 함수를 추적 
test("obj.minus 함수가 1번 호출 되었는가", () => {
    // 객체에 포함된 obj.minus 함수를 감시
    // 정확히는 obj.minus 함수는 mock 함수로 바뀜
    jest.spyOn(obj, 'minus')

    // 감시중인 함수를 호출
    const result: number = obj.minus(3,2)

    // 첫 번째는 obj.minus가 호출 되었는지
    expect(obj.minus).toHaveBeenCalledTimes(1)
    // 두 번째는 그 결과가 의도한 바와 같은지
    expect(result).toBe(1)
})