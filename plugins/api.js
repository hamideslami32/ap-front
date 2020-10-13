export class BaseApi {}

export default function(ctx) {
    const axios = ctx.app.$axios
    axios.defaults.headers.common.Timezone = -new Date().getTimezoneOffset()
    axios.defaults.headers.common.Channel = 'WEBSITE'
    BaseApi.prototype.axios = axios
}
