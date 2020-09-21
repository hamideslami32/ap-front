<template>
    <b-modal v-model="$auth.showModal" hide-footer @hidden="resolve">
        <template v-slot:modal-title>
            ورود یا عضویت
        </template>
        <template v-slot:modal-header-close>
            <svgicon name="arrow-left" width="20" height="20" />
        </template>
        <v-observer v-slot="{ handleSubmit }" ref="loginForm" slim>
            <form v-if="step === 'otp'" class="auth-form" @submit.prevent="handleSubmit(requestOtp)">
                <p>لطفا شماره همراه خود را وارد نمایید</p>
                <v-provider v-slot="{ errors }" name="شماره همراه" vid="phone" rules="required|min:11|mobileNumber">
                    <custom-input
                        v-model="mobile"
                        v-localize-number
                        dir="ltr"
                        input-class="auth-form__input"
                        type="tel"
                        class="mb-1 text-center"
                        inputmode="numeric"
                        maxlength="11"
                        title="شماره همراه"
                    />
                    <span class="validation-alert">{{ errors[0] }}</span>
                </v-provider>
                <a-btn
                    wrapper-class="mt-3"
                    type="submit"
                    :loading="loading"
                    shadow
                    block
                    variant="primary"
                >
                    ورود
                </a-btn>
            </form>
        </v-observer>
        <form v-if="step === 'verification'" class="auth-form">
            <p>کد پیامک شده را وارد نمایید</p>
            <digit-input ref="digitInputs" v-model="digits" @done="verifyOtpRequest" />
            <a-btn
                ref="submitBtn"
                :disabled="digits.filter(el => el != null).length < 5"
                :loading="loading"
                shadow
                block
                variant="primary"
                @click.prevent="verifyOtpRequest"
            >
                تأیید
            </a-btn>
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
import DigitInput from '~/components/auth/DigitInput'
import Timer from '~/components/Timer'
import { extend } from 'vee-validate'
import '~/plugins/veeValidate/rules/required'
import '~/plugins/veeValidate/rules/mobileNumber'
import {min} from 'vee-validate/dist/rules'

extend('min', {
    ...min,
    message: 'شماره همراه را صحیح وارد نمایید'
})

export default {
    components: {
        Timer,
        DigitInput,
        CustomInput
    },
    data() {
        return {
            step: 'otp',
            mobile: '',
            digits: new Array(5).fill(null),
            resend: false,
            loading: false,
            duration: 60,
            tryCount: 0
        }
    },
    methods: {
        async requestOtp() {
            try {
                this.loading = true
                const data = await this.$auth.requestOtp(this.mobile)
                data.otp && alert(data.otp)
                this.duration = Number(data.duration)
                this.step = 'verification'
            } catch (e) {
                if (e.response.status === 429) {
                    this.$refs.loginForm.setErrors({
                        phone: 'شما چند لحظه پیش درخواست داده‌اید، لطفا کمی صبر کنید.'
                    })
                }
            } finally {
                this.loading = false
            }
        },
        finishCounter() {
            this.resend = true
        },
        async verifyOtpRequest() {
            try {
                this.loading = true
                await this.$auth.verifyOtp(this.mobile, this.digits.join(''))
                Object.assign(this.$data, this.$options.data())
            } catch (e) {
                this.$refs.digitInputs.$children.forEach(el => {
                    el.$el.querySelector('input').value = ''
                })
                if(e.response.status === 401) {
                    this.$toast.alert('کد وارد شده اشتباه میباشد.')
                }
            }finally {
                this.loading = false
            }
        },
        resendRequest() {
            this.$refs.digitInputs.$children.forEach(el => {
                el.$el.querySelector('input').value = ''
            })
            this.digits = new Array(5).fill(null)
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
            &::placeholder {
                text-align: center;
            }
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

        /deep/ .btn.disabled {
            opacity: 1;
            background: #6c757d;
        }
    }
</style>
