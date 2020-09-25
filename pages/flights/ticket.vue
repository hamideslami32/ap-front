<template>
    <div>
        {{ ticket }}
    </div>
</template>

<script>
export default {

    layout: 'empty',

    async asyncData({ req, error }) {
        if (!process.server) {
            window.location.reload()
            return
        }

        if (req.method === 'POST') {
            return {
                ticket: await rawBody(req)
            }
        }

        return error({statusCode: 404})
    }
}

function rawBody(req) {
    return new Promise((resolve, reject) => {
        (process.server ? require('raw-body') : (() => {}))(req, {
            length: req.headers['content-length'],
            limit: '2mb'
            // encoding: contentType.parse(req).parameters.charset
        }, (err, string) => err ? reject(err) : resolve(string.toString()))
    })
}
</script>
