const sleep = (ms) => new Promise(resolve => {
    setTimeout(resolve, ms)
})

export function axiosPolling(fn, {
    retryWhile,
    retryOnError,
    delay = 0,
    ...args
}) {
    return fn().then(res => {
        if (retryWhile(res, args.i || 1)) {
            return sleep(delay).then(() => axiosPolling(fn, { retryWhile, retryOnError, delay, i: args.i + 1 }))
        }
        return res
    }).catch(err => {
        if (typeof retryOnError === 'function' ? retryOnError(err) : !!retryOnError) {
            return sleep(delay).then(() => axiosPolling(fn, { retryWhile, retryOnError, delay, i: args.i + 1 }))
        }
        throw err
    })
}
