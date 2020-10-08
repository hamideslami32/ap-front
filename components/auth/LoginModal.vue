<template>
    <b-modal v-model="$auth.showModal" hide-footer @hidden="resolve">
        <template v-slot:modal-title>
            ورود یا عضویت
        </template>
        <template v-slot:modal-header-close>
            <svgicon name="arrow-left" width="20" height="20" />
        </template>
        <b-tabs>
            <b-tab class="pt-4" title="ورود با رمز موقت">
                <v-observer v-slot="{ handleSubmit }" ref="loginForm" slim>
                    <form v-if="step === 'otp'" class="auth-form" @submit.prevent="handleSubmit(requestOtp)">
                        <p>لطفا شماره همراه خود را وارد نمایید</p>
                        <v-provider v-slot="{ errors }" name="شماره همراه" vid="phone" rules="required|min:11|mobileNumber">
                            <b-form-group class="mb-2" :state="errors.length ? false : null" :invalid-feedback="errors[0]">
                                <a-input
                                    v-model="mobile"
                                    v-localize-number
                                    dir="ltr"
                                    class="auth-form__input mb-2"
                                    type="tel"
                                    wrapper-class="mb-1 text-center"
                                    inputmode="numeric"
                                    maxlength="11"
                                    placeholder="شماره همراه"
                                />
                            </b-form-group>
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
                        :disabled="disableConfirmBtn"
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
            </b-tab>
            <b-tab class="pt-4" title="ورود با رمز عبور">
                <v-observer v-slot="{ handleSubmit }" ref="loginForm" slim>
                    <form class="auth-form" @submit.prevent="handleSubmit(loginPassword)">
                        <p>لطفا شماره همراه خود را وارد نمایید</p>
                        <v-provider v-slot="{ errors }" name="شماره همراه" vid="phone" rules="required|min:11|mobileNumber">
                            <b-form-group class="mb-2" :state="errors.length ? false : null" :invalid-feedback="errors[0]">
                                <a-input
                                    v-model="mobile"
                                    v-localize-number
                                    dir="ltr"
                                    class="auth-form__input mb-2"
                                    type="tel"
                                    wrapper-class="mb-1 text-center"
                                    inputmode="numeric"
                                    maxlength="11"
                                    placeholder="شماره همراه"
                                />
                            </b-form-group>
                        </v-provider>
                        <v-provider v-slot="{ errors }" name="رمز عبور" vid="password" rules="required|min:6">
                            <b-form-group class="mb-2" :state="errors.length ? false : null" :invalid-feedback="errors[0]">
                                <a-input
                                    v-model="password"
                                    v-localize-number
                                    dir="ltr"
                                    class="auth-form__input mb-2"
                                    type="password"
                                    wrapper-class="mb-1 text-center"
                                    placeholder="رمز عبور"
                                />
                            </b-form-group>
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
            </b-tab>
        </b-tabs>
    </b-modal>
</template>

<script>

import AInput from '~/components/ui/form/AInput'
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
        AInput
    },
    data() {
        return {
            step: 'otp',
            mobile: '',
            password: '',
            digits: new Array(5).fill(null),
            resend: false,
            loading: false,
            duration: 60,
            tryCount: 0
        }
    },
    computed: {
        disableConfirmBtn() {
            return this.digits.filter(el => el !== null).length < 5
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
                this.step = 'verification'
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

        async loginPassword() {
            await this.$auth.loginPassword(this.mobile, this.password)
        },

        resolve() {
            const { user, _resolve, _reject } = this.$auth
            if (user) {
                _resolve && _resolve(user)
            } else {
                _reject && _reject(new Error('Close'))
            }
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

        /deep/ .form-control {
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
