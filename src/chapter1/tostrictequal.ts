export function obj() {
    return {a:"hello"}
}

class Obj {
    public a: string
    constructor(str: string) {
        this.a = str
    }
}

export function obj2(str: string) {
    return new Obj(str)
}