import { noPromise, okpromise } from "./asyncfn"

// async, promise 함수는 resolves를 사용해 반환값을 테스트할 경우에 반드시 return 해주어야 함
// 그렇지 않으면 함수가 종료되지 않은채로 테스트를 마치기 때문에 무조건 성공이 뜸
// resolves를 사용하지 않고 테스트를 하겠다면 await 처리해 직접 동기처리 해주어야 함

test("okPromise 테스트", async () => {
    const okSpy = jest.fn(okpromise)

    // await로 처리 할 경우
    const result = await okSpy()
    expect(result).toBe('ok')

    // resolves를 사용할 경우
    return expect(okSpy()).resolves.toBe('ok')
})

test("noPromise 테스트", async () => {
    const noSpy = jest.fn(noPromise)

    // await로 처리 할 경우
    try {
        await noSpy()
    } catch(e) {
        expect(e).toBe('no')
    } finally {
        // rejects를 사용할 경우
        return expect(noSpy()).rejects.toBe('no')
    }
})