import { cal } from "./tobe"

test('cal 함스는 두 숫자를 더해야 한다.', () => {
    expect(cal(1, 2)).toBe(3)
})