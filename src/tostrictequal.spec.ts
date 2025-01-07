import { obj, obj2 } from "./tostrictequal"

test("객체 내부 구성 비교는 toStrictEqual로", () => {
    expect(obj()).toStrictEqual({a:"hello"})    
    expect(obj()).not.toBe({a:"hello"})    
})

test("클래스 인스턴스 내부 구성 비교는 toMatchObject로", () => {
    expect(obj2("hello")).toMatchObject({a:"hello"})
    expect(obj2("hello")).not.toStrictEqual({a:"hello"})
})