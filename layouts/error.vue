<template>
    <div>
        <div v-if="error.statusCode === 404" class="py-5 text-center">
            <p>
                صفحه ی مورد نظر یافت نشد
            </p>
            <nuxt-link to="/">
                بازگشت به اپرو
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        error: {
            type: Object,
            default: null
        }
    }
}
</script>
