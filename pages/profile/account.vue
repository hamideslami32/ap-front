<template>
    <div class="account">
        <portal to="header">
            حساب کاربری
        </portal>
        <b-tabs content-class="mt-5 px-2">
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
                    <form @submit.prevent="submitInfo">
                        <custom-input v-model="account.firstName" title="نام" input-class="input text-3" />
                        <custom-input v-model="account.lastName" title="نام خانوادگی" input-class="input text-3" />
                        <custom-input v-model="account.email" title="ایمیل" input-class="input text-3" dir="ltr" />
                        <custom-input v-model="account.birthdate" title="تاریخ تولد" input-class="input text-3" dir="ltr" />
                        <a-btn variant="primary" class="submit-btn" type="submit">
                            تائید ویرایش
                        </a-btn>
                    </form>
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
                    <form @submit.prevent="submitPassword">
                        <template v-if="user.password">
                            <custom-input v-model="changePassword.currentPassword" type="password" title="رمز عبور فعلی" input-class="input text-3" />
                            <p class="text-3 mt-4">
                                رمز عبور جدید
                            </p>
                        </template>

                        <custom-input v-model="changePassword.newPassword" type="password" title="رمز عبور جدید" input-class="input text-3" />
                        <custom-input v-model="changePassword.confirmPassword" type="password" title="تکرار رمز عبور جدید" input-class="input text-3" />
                        <a-btn variant="primary" class="submit-btn" type="submit">
                            تغییر رمز عبور
                        </a-btn>
                    </form>
                </div>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>

import CustomInput from '~/components/ui/form/CustomInput'
import Field from '~/components/ui/Field'
import CheckedTick from '~/components/ui/CheckedTick'

export default {
    name: 'Account',
    components: {Field, CustomInput, CheckedTick},
    layout: 'page',
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
            const { firstName = '', lastName = '' } = this.user
            return firstName + ' ' + lastName
        }
    },
    watch: {
        'account.birthdate'(t, f) {
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
            const account = { ...this.account }
            if (account.birthdate) {
                const isJalaali = account.birthdate.split(/-|\//)[0] < 1700
                account.birthdate = this.$dayjs(account.birthdate, { jalali: isJalaali })
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

        /deep/ .custom-input {
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