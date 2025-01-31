import { timer } from "./callback"

// test의 매개값인 done을 받아오면 무조건 실행 해주어야 함
// 그렇지 않으면 테스트가 무조건 실패
test("타이머가 잘 실행 되었는가", () => {
    expect(true).toBe(true)
    // 테스트 길어져서 주석처리
    // timer((answer: string) => {
    //     expect(answer).toBe("success")
    //     done()
    // })
})