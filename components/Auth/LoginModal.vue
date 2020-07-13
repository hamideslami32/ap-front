<template>
    <b-modal v-model="$auth.showModal" hide-footer>
        <template v-slot:modal-title>
            ورود یا عضویت
        </template>
        <form v-if="step === 'otp'" class="auth-form" action="#">
            <p>لطفا شماره همراه خود را وارد نمایید</p>
            <custom-input v-model="mobile" title="شماره موبایل" />
            <full-btn @click.prevent="requestOtp">
                ورود
            </full-btn>
        </form>
        <form v-if="step === 'verification'">
            <digit-input v-model="digits" />
        </form>
    </b-modal>
</template>

<script>

import CustomInput from '~/components/Ui/Form/CustomInput'
import FullBtn from '~/components/Ui/Buttons/FullBtn'
import DigitInput from '~/components/Auth/DigitInput'

export default {
    components: {
        DigitInput,
        FullBtn,
        CustomInput
    },
    data() {
        return {
            step: 'verification',
            mobile: '',
            digits: new Array(5).fill(null)
        }
    },
    methods: {
        async requestOtp() {
            try{
                const data = await this.$auth.requestOtp(this.mobile)
                if (data.message === 'failed') {}
                this.step = 'verification'
            }
            catch (e) {

            }
        }
    }
}
</script>


<style lang="scss" scoped>
.auth-form {
    font-size: 15px;
    color: $grayColor;
    text-align: center;

    &__input {
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
        border-radius: 3px;
        height: 50px;
    }
}
</style>