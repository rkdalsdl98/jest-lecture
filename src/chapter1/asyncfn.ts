export function okpromise() {
    return Promise.resolve('ok')
}

export function noPromise() {
    return Promise.reject('no')
}

export async function okAsync() {
    return 'ok'
}

export async function noAsync() {
    throw 'no'
}