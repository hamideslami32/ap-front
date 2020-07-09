export class BaseApi {}

export default function(ctx) {
    BaseApi.prototype.axios = ctx.app.$axios
}