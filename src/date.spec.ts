import { after3days } from "./date"

test('3일후를 반환 하는지', () => {
    // 테스트 로직이 돌아가면서 생기는 실행 시간의 차이 때문에 정확한 시간을 비교 할 수 없다.
    // 이를 방지 하기 위해 임의로 시간을 지정해주는 함수 jest.useFakeTimers
    jest.useFakeTimers().setSystemTime(new Date(2024, 3, 9))

    // Date 또한 객체 이기 때문에 toStrictEqual로 비교
    expect(after3days()).toStrictEqual(new Date(2024, 3, 12))

    // 현실 시간으로 되돌려 놓기
    jest.useRealTimers()
})