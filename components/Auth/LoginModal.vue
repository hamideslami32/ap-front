<template>
    <b-modal v-model="$auth.showModal" hide-footer>
        <template v-slot:modal-title>
            ورود یا عضویت
        </template>
        <form v-if="step === 'otp'" class="auth-form" action="#">
            <p>لطفا شماره همراه خود را وارد نمایید</p>
            <custom-input v-model="mobile" maxlength="11" title="شماره موبایل" />
            <full-btn type="submit" @click.prevent="requestOtp">
                ورود
            </full-btn>
        </form>
        <form v-if="step === 'verification'" class="auth-form">
            <p>کد پیامک شده را وارد نمایید</p>
            <digit-input ref="digitInputs" v-model="digits" @done="verifyOtpRequest" />
            <full-btn ref="submitBtn" :disabled="canSendVerifyCode" @click.prevent="verifyOtpRequest">
                تأیید
            </full-btn>
            <p class="mt-5 text-right" :class="{ 'invisible': resend }">
                زمان اعتبار کد ارسالی
            </p>
            <span v-if="!resend" class="auth-form__timer-holder float-right">
                <svgicon class="icon auth-form__timer-holder__icon" name="home" width="30" height="30" />
                <Timer :duration="duration" @finish="finishCounter" />
            </span>
            <b-button
                :disabled="!resend"
                class="float-left d-inline-block auth-form__resend-otp"
                variant="outline-info"
                @click.prevent="resendRequest"
            >
                ارسال مجدد
            </b-button>
        </form>
    </b-modal>
</template>

<script>

import CustomInput from '~/components/Ui/Form/CustomInput'
import FullBtn from '~/components/Ui/Buttons/FullBtn'
import DigitInput from '~/components/Auth/DigitInput'
import Timer from '~/components/Timer'

export default {
    components: {
        Timer,
        DigitInput,
        FullBtn,
        CustomInput
    },
    data() {
        return {
            step: 'otp',
            mobile: '',
            digits: new Array(5).fill(null),
            resend: false,
            canSendVerifyCode: true,
            duration: 60,
            tryCount: 0
        }
    },
    computed: {
        verifyCode() {
            return this.digits.join('')
        }
    },
    methods: {
        async requestOtp() {
            try {
                const data = await this.$auth.requestOtp(this.mobile)
                this.duration = Number(data.duration)
                this.step = 'verification'
            } catch (e) {

            }
        },
        finishCounter() {
            this.resend = true
        },
        async verifyOtpRequest() {
            try {
                this.canSendVerifyCode = false
                await this.$auth.verifyOtp(this.mobile, this.verifyCode)
            } catch (e) {
                alert(e.response.data.message)
                this.$refs.digitInputs.$children.forEach(el => {
                    el.$el.querySelector('input').value = ''
                })
                this.canSendVerifyCode = true
                this.resend = true
            }
        },
        resendRequest() {
            this.requestOtp()
                .then(res => {
                    this.$refs.digitInputs.$el.querySelector('input').focus()
                    this.resend = false
                })
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

    &__resend-otp {
        height: 38px;
        font-size: 13px;
        padding: 5px 20px;
    }

    &__timer-holder {
        color: $darkGrayColor;

        &__icon {
            color: $primary;
            padding: 5px;
            box-sizing: content-box;
            background: rgba(71, 32, 134, 0.1);
        }
    }
}
</style>