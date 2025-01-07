import { obj } from "./mockfn"

// spyon 된 객체, 함수는 테스트가 진행되는 동안 계속 추적되며, 이 전에 mockImplementation, mockImplementationOnce같은
// 테스트 함수로 기존의 함수를 대체하거나 mockReturnValue로 반환값을 변경한다면 이후의 테스트는 이에 영향을 받아
// 바뀐체로 테스트가 됨


// mockImplementationOnce은 1번만 해당 함수를 mockImplementation하는 것
// 아래 예제와 같이 여러번 사용하면 그 만큼 횟수가 증가
// mockImplementation을 맨 마지막에 추가하면 기존의 로직이 아닌 오버라이딩 된 로직이 기본으로 호출됨
test("obj.minus 함수를 n번만 오버라이딩", () => {
    // 객체에 포함된 obj.minus 함수를 mockImplementation으로 () => number로 대체
    // 매개값은 안받아와도 상관없음
    jest.spyOn(obj, 'minus')
    .mockImplementationOnce(() => 2)
    .mockImplementationOnce((x, y) => x + y)

    // 감시중인 함수를 호출
    // 무조건 5를 반환
    const result1: number = obj.minus(3,2)
    const result2: number = obj.minus(3,2)
    const result3: number = obj.minus(3,2)

    // 첫 번째는 obj.minus가 호출 되었는지
    expect(obj.minus).toHaveBeenCalledTimes(3)

    // 처음 mockImplementation된 2가 반환
    expect(result1).toBe(2)
    // 두 번째 mockImplementation된 x + y가 반환
    expect(result2).toBe(5)
    // 더 이상 실행할 mockImplementation이 없어 원래 로직인 x - y 반환
    expect(result3).toBe(1)
})

// mockImplementation은 실제 함수의 동작을 대신하는 로직을 오버라이딩 해줌
// 매개값도 받아 올 수 있음
// DB나 Redis등 실제 데이터 영향이 갈 수 있는 로직들을 mockImplementation하여 방지 할 수 있음
test("obj.minus 함수를 오버라이딩", () => {
    // 객체에 포함된 obj.minus 함수를 mockImplementation으로 () => number로 대체
    // 매개값은 안받아와도 상관없음
    jest.spyOn(obj, 'minus').mockImplementation(() => 5)

    // 감시중인 함수를 호출
    // 무조건 5를 반환
    const result: number = obj.minus(3,2)

    // 첫 번째는 obj.minus가 호출 되었는지
    // 하나의 spec.ts 파일에 같은 객체를 spyon 하고 함수를 실행하면 toHaveBeenCalledTimes에서 호출을 누적함
    // 그렇기 때문에 맨 처음 호출한 횟수: 1 + 이 test문 안에서 호출한 횟수: 3 = 4
    expect(obj.minus).toHaveBeenCalledTimes(4)
    // 두 번째는 그 결과가 의도한 바와 같은지
    expect(result).toBe(5)
})

// test("obj.minus 함수의 반환값이 변경되었는가", () => {
//     // 객체의 포함된 함수의 로직은 그대로 두고 반환 값만 변경
//     jest.spyOn(obj, 'minus').mockReturnValue(5)

//     // 감시중인 함수를 호출
//     // 무조건 5를 반환
//     const result: number = obj.minus(3,2)

//     // 첫 번째는 obj.minus가 호출 되었는지
//     expect(obj.minus).toHaveBeenCalledTimes(1)
//     // 두 번째는 그 결과가 의도한 바와 같은지
//     expect(result).toBe(5)
// })

test("obj 스파이 초기화", () => {
    // 객체의 포함된 함수의 로직은 그대로 두고 반환 값만 변경
    const spyFn = jest.spyOn(obj, 'minus').mockReturnValue(5)

    // Time, With 초기화
    // toHaveBeenCalledTimes 같은 함수 호출 횟수 같은 메타 데이터만 초기화
    // spyFn.mockClear()

    // mockClear + mockImplementation(() => {})
    // mockClear와 mockImplementation을 () => {}로 만듬
    // 원래 추적하던 함수의 원형으로 돌아가는게
    // spyFn.mockReset() 

    // 모두 초기화
    spyFn.mockRestore()
})

// 맨 처음에 한 번
beforeAll(() => {})
// 매 번 실행 전에
beforeEach(() => {})

// 매 번 실행 후에
afterEach(() => {})
// 맨 마지막에 한 번
afterAll(() => {})