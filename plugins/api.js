export class BaseApi {}

export default function(ctx) {
    const axios = ctx.app.$axios
    axios.defaults.headers.common.Timezone = -new Date().getTimezoneOffset()
    BaseApi.prototype.axios = axios
}
