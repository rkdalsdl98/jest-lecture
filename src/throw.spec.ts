import { CustomError, customError, error } from "./throw"

test("에러가 잘 발생 되는가", () => {
    // 에러에 경우 생성자 및 prototype 객체를 비교
    expect(() => error()).toThrow(Error)
    expect(() => customError()).toThrow(CustomError)
})

test("에러가 잘 발생 되는가2", () => {
    // try catch로 에러를 테스트 할 경우, throwing된 에러는 객체 이므로 toStrictEqual, toMatchObject등
    // 객체를 비교하는 함수를 사용
    try {
        error()
    } catch(e) {
        expect(e).toStrictEqual(new Error())
    }
})

