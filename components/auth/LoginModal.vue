<template>
    <b-modal v-model="$auth.showModal" hide-footer @hidden="resolve">
        <template v-slot:modal-title>
            ورود یا عضویت
        </template>
        <template v-slot:modal-header-close>
            <svgicon name="arrow-long-right" width="20" height="20" />
        </template>
        <form v-if="step === 'otp'" class="auth-form" action="#">
            <p>لطفا شماره همراه خود را وارد نمایید</p>
            <custom-input
                v-model="mobile"
                input-class="auth-form__input"
                type="tel"
                maxlength="11"
                title="شماره همراه"
            />
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
            <div class="mt-5 d-flex justify-content-between align-items-center">
                <div class="d-flex flex-column align-items-start">
                    <span class="auth-form__tip">
                        {{ !resend ? 'زمان اعتبار کد ارسالی به شماره' : 'کد ارسال نشد! مجدد تلاش کنید' }}
                    </span>
                    <span class="auth-form__number">
                        {{ mobile }}
                    </span>
                </div>
                <span v-if="!resend" class="auth-form__timer-holder">
                    <timer :duration="duration" @finish="finishCounter" />
                </span>
                <b-button
                    v-else
                    :disabled="!resend"
                    class="float-left d-inline-block auth-form__resend-otp"
                    variant="outline-secondary"
                    @click.prevent="resendRequest"
                >
                    ارسال مجدد
                </b-button>
            </div>
        </form>
    </b-modal>
</template>

<script>

import CustomInput from '~/components/ui/form/CustomInput'
import FullBtn from '~/components/ui/buttons/FullBtn'
import DigitInput from '~/components/auth/DigitInput'
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
                Object.assign(this.$data, this.$options.data())
            } catch (e) {
                this.$refs.digitInputs.$children.forEach(el => {
                    el.$el.querySelector('input').value = ''
                })
                this.canSendVerifyCode = true
                this.resend = true
            }
        },
        resendRequest() {
            this.step = 'otp'
        },

        resolve() {
            const user = this.$auth.user;
            (this.$auth[user ? '_resolve' : '_reject'] || (() => {}))()
            this.$auth._resolve = null
            this.$auth._reject = null
        }
    }
}
</script>


<style lang="scss" scoped>
    .auth-form {
        padding-left: 30px;
        padding-right: 30px;
        font-size: 15px;
        color: $grayColor;
        text-align: center;

        /deep/ &__input {
            box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
            border-radius: 10px;
            height: 50px;
            border: 1px solid map_get($grays, '400');
        }

        .resend-section {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        &__resend-otp {
            height: 38px;
            font-size: 0.8em;
            padding: 5px 20px;
        }

        &__tip {
            font-size: 0.7em;
            white-space: nowrap;
            color: map_get($grays, '700');
        }

        &__number {
            font-size: 0.8em;
            font-weight: 600;
            color: map_get($grays, '800');
        }

        &__timer-holder {
            color: $secondary;
            border: 1px solid $secondary;
            padding: 5px 20px;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 600;
        }
    }
</style>
