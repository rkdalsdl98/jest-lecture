export function timer(callback: (answer: string) => void) {
    setTimeout(() => callback("success"), 3000)
}