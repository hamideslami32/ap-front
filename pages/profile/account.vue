<template>
    <div class="account">
        <portal to="title">
            حساب کاربری
        </portal>
        <b-tabs content-class="mt-5 px-2 mb-3">
            <b-tab title="مشخصات فردی" active @click="editAccount = false">
                <div v-if="!editAccount" class="account__show">
                    <p class="text-3">
                        اطلاعات شخصی
                    </p>
                    <field title="نام و نام خانوادگی" :value="userFullName" />
                    <field class="mt-2" title="تاریخ تولد">
                        {{ user.birthdate ? $dayjs(user.birthdate).format('YYYY-MM-DD') : 'نامشخص' }}
                    </field>
                    <p class="text-3 mt-5">
                        اطلاعات تماس
                    </p>
                    <field title="شماره تماس">
                        <span dir="ltr">{{ user.phone }}</span>
                        <checked-tick v-if="user.isConfirmed" />
                    </field>
                    <field class="mt-2" title="ایمیل" :value="user.email" />
                </div>
                <div v-else class="account__edit-section">
                    <p class="text-3 text-center">
                        ویرایش اطلاعات شخصی
                    </p>
                    <v-observer v-slot="{ handleSubmit }" slim>
                        <form @submit.prevent="handleSubmit(submitInfo)">
                            <v-provider v-slot="{ errors }" name="نام" rules="required" slim>
                                <b-form-group class="mb-2" :state="errors.length ? false : null" :invalid-feedback="errors[0]">
                                    <a-input
                                        v-model="account.firstName"
                                        placeholder="نام"
                                        class="input text-3"
                                        :state="errors.length ? false : null"
                                    />
                                </b-form-group>
                            </v-provider>
                            <v-provider v-slot="{ errors }" name="نام خانوادگی" rules="required" slim>
                                <b-form-group class="mb-2" :state="errors.length ? false : null" :invalid-feedback="errors[0]">
                                    <a-input
                                        v-model="account.lastName"
                                        placeholder="نام خانوادگی"
                                        class="input text-3"
                                        :state="errors.length ? false : null"
                                    />
                                </b-form-group>
                            </v-provider>
                            <v-provider v-slot="{ errors }" name="ایمیل" rules="required|email" slim>
                                <b-form-group class="mb-2" :state="errors.length ? false : null" :invalid-feedback="errors[0]">
                                    <a-input
                                        v-model="account.email"
                                        placeholder="ایمیل"
                                        class="input text-3"
                                        dir="ltr"
                                        :state="errors.length ? false : null"
                                    />
                                </b-form-group>
                            </v-provider>
                            <v-provider v-slot="{ errors }" name="تاریخ تولد" rules="required|date" slim>
                                <b-form-group class="mb-2" :state="errors.length ? false : null" :invalid-feedback="errors[0]">
                                    <a-input
                                        v-model="account.birthdate"
                                        placeholder="تاریخ تولد"
                                        class="input text-3"
                                        inputmode="numeric"
                                        maxlength="10"
                                        dir="ltr"
                                        :state="errors.length ? false : null"
                                    />
                                </b-form-group>
                            </v-provider>
                            <a-btn
                                variant="primary"
                                block
                                shadow
                                class="submit-btn"
                                type="submit"
                            >
                                تائید ویرایش
                            </a-btn>
                        </form>
                    </v-observer>
                </div>
                <b-button
                    v-if="!editAccount"
                    class="account__edit text-3"
                    variant="outline-secondary"
                    @click.prevent="showAccountEdit"
                >
                    ویرایش
                </b-button>
            </b-tab>
            <b-tab title="رمز عبور">
                <div class="account__edit-section">
                    <p class="text-3 text-center">
                        تغییر رمز عبور
                    </p>
                    <v-observer v-slot="{ handleSubmit }" slim>
                        <form @submit.prevent="handleSubmit(submitPassword)">
                            <template v-if="user.password">
                                <v-provider v-slot="{ errors }" name="رمز عبور فعلی" rules="required|min:6" slim>
                                    <b-form-group class="mb-2" :state="errors.length ? false : null" :invalid-feedback="errors[0]">
                                        <a-input
                                            v-model="changePassword.currentPassword"
                                            type="password"
                                            placeholder="رمز عبور فعلی"
                                            class="input text-3"
                                            :state="errors.length ? false : null"
                                        />
                                    </b-form-group>
                                </v-provider>
                                <p class="text-3 mt-4">
                                    رمز عبور جدید
                                </p>
                            </template>
                            <v-provider
                                v-slot="{ errors }"
                                name="رمز عبور جدید"
                                rules="required|min:6|password:@confirm"
                            >
                                <b-form-group class="mb-2" :state="errors.length ? false : null" :invalid-feedback="errors[0]">
                                    <a-input
                                        v-model="changePassword.newPassword"
                                        wrapper-class="mb-1 mt-3"
                                        type="password"
                                        placeholder="رمز عبور جدید"
                                        class="input text-3"
                                        :state="errors.length ? false : null"
                                    />
                                </b-form-group>
                            </v-provider>
                            <v-provider v-slot="{ errors }" name="رمز عبور جدید" rules="required|min:4" slim>
                                <b-form-group class="mb-2" :state="errors.length ? false : null" :invalid-feedback="errors[0]">
                                    <a-input
                                        v-model="changePassword.confirmPassword"
                                        wrapper-class="mb-1 mt-3"
                                        type="password"
                                        placeholder="تکرار رمز عبور جدید"
                                        class="input text-3"
                                        :state="errors.length ? false : null"
                                    />
                                    <!--                                    <span v-if="errors[0]" class="validation-alert">تکرار رمز عبور جدید الزامی میباشد</span>-->
                                </b-form-group>
                            </v-provider>
                            <a-btn
                                variant="primary"
                                shadow
                                block
                                class="submit-btn"
                                type="submit"
                            >
                                تغییر رمز عبور
                            </a-btn>
                        </form>
                    </v-observer>
                </div>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>

import AInput from '~/components/ui/form/AInput'
import Field from '~/components/ui/Field'
import CheckedTick from '~/components/ui/CheckedTick'
import {extend} from 'vee-validate'
import {min} from 'vee-validate/dist/rules'
import '~/plugins/veeValidate/rules/required'
import '~/plugins/veeValidate/rules/latinWord'
import '~/plugins/veeValidate/rules/alphaSpace'
import '~/plugins/veeValidate/rules/email'
import '~/plugins/veeValidate/rules/dateValidation'
import {toLatin} from '~/plugins/numbers'

extend('password', {
    params: ['target'],
    validate(value, {target}) {
        return value === target
    },
    message: 'رمز عبور جدید و تکرار آن یکسان نمیباشد'
})

extend('min', {
    ...min,
    message: 'رمز عبور باید حداقل ۶ حرف یا عدد باشد'
})

export default {
    name: 'Account',
    auth: true,
    components: {Field, AInput, CheckedTick},
    data() {
        const user = this.$auth.user
        return {
            editAccount: false,
            account: {
                firstName: user.firstName || undefined,
                lastName: user.lastName || undefined,
                email: user.email || undefined,
                birthdate: user.birthdate ? this.$dayjs(user.birthdate).calendar('jalali').format('YYYY-MM-DD') : undefined
            },
            changePassword: {
                currentPassword: null,
                newPassword: null,
                confirmPassword: null
            }
        }
    },
    computed: {
        user() {
            return this.$auth.user
        },
        userFullName() {
            const {firstName = '', lastName = ''} = this.user
            return firstName + ' ' + lastName
        }
    },
    watch: {
        'account.birthdate'(t, f) {
            t = toLatin(t)
            if (t && (!t.match(/^[\d-]+$/) || t.length > 10)) this.account.birthdate = f
            const [tl, fl] = [t.length, (f || '').length]
            if (tl - fl === 1) {
                if (tl === 4 || tl === 7) {
                    this.account.birthdate += '-'
                }
            }
        }
    },
    methods: {

        showAccountEdit() {
            this.editAccount = true
        },

        async submitInfo() {
            const account = {...this.account}
            if (account.birthdate) {
                const isJalaali = account.birthdate.split(/-|\//)[0] < 1700
                account.birthdate = this.$dayjs(account.birthdate, {jalali: isJalaali})
                    .calendar('gregory').format('YYYY-MM-DD')
            }
            await this.$auth.patchUser(account)
            this.editAccount = false
        },

        async submitPassword() {
            try {
                await this.$auth.patchUser({
                    currentPassword: this.changePassword.currentPassword,
                    password: this.changePassword.newPassword
                })
                this.editAccount = false
                await this.$auth.logout('/login')
            } catch (e) {

            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .account {
        &__show, &__edit-section {
            color: map_get($grays, '700');
        }

        &__edit {
            position: absolute;
            display: inline-block;
            bottom: 20px;
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            width: 140px;
            height: 40px;
            font-weight: 600;
        }

        /deep/ .form-control {
            margin-bottom: 10px;
        }

        &__edit-section {
            padding: 0 40px;
        }

        .btn-wrapper {
            width: 100%;
            display: block;
            margin-top: 20px;

            button {
                width: 100%;
                height: 50px;
                font-weight: 600;
            }
        }
    }
</style>
