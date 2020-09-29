<template>
    <div class="container">
        <section class="mt-3">
            <h3 class="mb-0 text-gray-1000 text-weight-500">
                تماس با ما
            </h3>
            <small class="text-primary">(سفری ارزان با اپرو)</small>
            <p class="mt-4 text-grays-1000">
                <span class="text-weight-600 text-gray-900 ml-2">شماره تماس:</span> ۲۰۰۰۰۰۰۰۰
            </p>
            <p class="text-grays-1000">
                <span class="text-weight-600 text-gray-900 ml-2">شماره فکس:</span> ۲۰۰۰۰۰۰۰۰
            </p>
            <p class="text-grays-1000">
                <span class="text-weight-600 text-gray-900 ml-2">پست الکترونیکی:</span> ۲۰۰۰۰۰۰۰۰
            </p>
            <p class="text-grays-1000">
                <span class="text-weight-600 text-gray-900 ml-2">آدرس:</span>تهران - اتوبان همت - اولین بریدگی - درخت کاج
            </p>
        </section>
        <section class="mt-5">
            <h5 class="text-center text-weight-500 text-primary">
                فرم تماس با ما
            </h5>
            <form class="px-5 mt-3" action="">
                <a-input wrapper-class="mb-1 mt-3" placeholder="نام و نام خانوادگی" />
                <a-input wrapper-class="mb-1 mt-3" placeholder="ایمیل" type="email" />
                <a-input wrapper-class="mb-1 mt-3" placeholder="تلفن همراه" />
                <b-textarea class="my-3" rows="6" placeholder="پیام شما" />
                <a-btn
                    variant="primary"
                    block
                    shadow
                    class="submit-btn"
                    type="submit"
                >
                    ارسال
                </a-btn>
            </form>
        </section>
    </div>
</template>

<script>
import AInput from '~/components/ui/form/AInput'

export default {
    name: 'Contact',
    layout: 'mobile',
    components: {AInput}
}
</script>

<style scoped>

</style>