<template>
    <v-observer v-slot="{ handleSubmit }" slim>
        <form action="" class="passenger-form" @submit.prevent="handleSubmit(submit)">
            <v-provider v-slot="{ errors }" name="نام" rules="latinWord|required" slim>
                <custom-input v-model="localValue.name" class="mb-1 mt-3" dir="ltr" title="نام به لاتین" />
                <span class="validation-alert">{{ errors[0] }}</span>
            </v-provider>
            <v-provider v-slot="{ errors }" name="نام خانوادگی" rules="latinWord|required" slim>
                <custom-input v-model="localValue.lastName" class="mb-1 mt-3" dir="ltr" title="نام خانوادگی به لاتین" />
                <span class="validation-alert">{{ errors[0] }}</span>
            </v-provider>
            <p class="text-3 text-gray-700 text-center my-3">
                جنسیت مسافر
            </p>

            <v-provider v-slot="{ errors }" name="جنسیت" rules="required">
                <b-form-group class="en font-weight-medium mb-1">
                    <b-form-radio
                        v-model="localValue.gender"
                        class="ml-0"
                        value="male"
                        :class="{ active: localValue.gender === 'male' }"
                        inline
                    >
                        مرد
                    </b-form-radio>
                    <b-form-radio
                        v-model="localValue.gender"
                        class="ml-0 mr-auto"
                        value="female"
                        :class="{ active: localValue.gender === 'female' }"
                        inline
                    >
                        زن
                    </b-form-radio>
                </b-form-group>
                <span class="validation-alert">{{ errors[0] }}</span>
            </v-provider>
            <template v-if="!passport">
                <v-provider v-slot="{ errors }" rules="nationalCode|required" name="کد ملی">
                    <custom-input
                        v-model="localValue.nationalCode"
                        class="mb-1 mt-3"
                        maxlength="10"
                        inputmode="numeric"
                        title="کد ملی"
                    />
                    <span class="validation-alert">{{ errors[0] }}</span>
                </v-provider>
            </template>
            <template v-else>
                <v-provider v-slot="{ errors }" rules="required" name="شماره پاسپورت">
                    <custom-input
                        v-model="localValue.passportCode"
                        class="mb-1 mt-3"
                        title="شماره پاسپورت"
                    />
                    <span class="validation-alert">{{ errors[0] }}</span>
                </v-provider>
                <v-provider v-slot="{ errors }" rules="required|date" name="تاریخ انقضای پاسپورت">
                    <custom-input
                        v-model="passportDate"
                        class="mb-1 mt-3"
                        maxlength="10"
                        inputmode="numeric"
                        title="تاریخ انقضای پاسپورت"
                    />
                    <span class="validation-alert">{{ errors[0] }}</span>
                </v-provider>
                <v-provider v-slot="{ errors }" rules="required" name="کشور صادر کننده پاسپورت">
                    <b-form-select v-model="localValue.passportCity" class="mb-1 mt-3" :options="options" />
                    <span class="validation-alert">{{ errors[0] }}</span>
                </v-provider>
            </template>
            <v-provider v-slot="{ errors }" name="تاریخ تولد" rules="required|date">
                <custom-input
                    v-model="birthdate"
                    dir="ltr"
                    class="mb-2 mt-3"
                    title="تاریخ تولد"
                    inputmode="numeric"
                    maxlength="10"
                />
                <span class="validation-alert">{{ errors[0] }}</span>
            </v-provider>
            <a-btn
                wrapper-class="mt-3"
                variant="primary"
                class="submit-btn"
                type="submit"
                block
            >
                ثبت
            </a-btn>
        </form>
    </v-observer>
</template>

<script>
import CustomInput from '~/components/ui/form/CustomInput'
import cloneDeep from 'lodash/cloneDeep'
import '~/plugins/veeValidate/rules/nationalCode'
import '~/plugins/veeValidate/rules/latinWord'
import '~/plugins/veeValidate/rules/required'
import '~/plugins/veeValidate/rules/dateValidation'
import {toLatin} from '~/plugins/numbers'



export default {
    name: 'PassengerForm',
    components: {CustomInput},
    props: {
        passport: {
            type: Boolean,
            default: false
        },
        value: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            country: null,
            localValue: cloneDeep(this.value),
            birthdate: this.value.birthdate ? this.$dayjs(this.value.birthdate).calendar('jalali').format('YYYY-MM-DD') : undefined,
            passportDate: this.passport && this.value.passportDate ? this.$dayjs(this.value.passportDate).calendar('jalali').format('YYYY-MM-DD') : undefined,
            options: [
                {value: null, text: 'کشور صادر کننده پاسپورت'},
                {value: 'هلند', text: 'هلند'},
                {value: 'آرژانتین', text: 'آرژانتین'},
                {value: 'افغانستان', text: 'افغانستان'},
                {value: 'امارات', text: 'امارات'},
                {value: 'فرانسه', text: 'فرانسه'}
            ]
        }
    },
    watch: {
        'birthdate'(t, f) {
            t = toLatin(t)
            if (t && (!t.match(/^[\d-]+$/) || t.length > 10)) this.birthdate = f
            const [tl, fl] = [t.length, (f || '').length]
            if (tl - fl === 1) {
                if (tl === 4 || tl === 7) {
                    this.birthdate += '-'
                }
            }
        },
        'passportDate'(t, f) {
            t = toLatin(t)
            if (t && (!t.match(/^[\d-]+$/) || t.length > 10)) this.passportDate = f
            const [tl, fl] = [t.length, (f || '').length]
            if (tl - fl === 1) {
                if (tl === 4 || tl === 7) {
                    this.passportDate += '-'
                }
            }
        }
    },
    methods: {
        submit() {
            const isJalaali = this.birthdate.split(/-|\//)[0] < 1700
            this.localValue.birthdate = this.$dayjs(this.birthdate, { jalali: isJalaali }).calendar('gregory').format('YYYY-MM-DD')
            this.localValue.passportDate = this.passportDate ? this.$dayjs(this.passportDate, { jalali: this.passportDate.split(/-|\//)[0] < 1700 }).calendar('gregory').format('YYYY-MM-DD') : undefined
            this.$emit('input', this.localValue)
            this.$emit('close')
        }
    }
}
</script>

<style lang="scss" scoped>
    .passenger-form {
        max-width: 280px;
        margin: 0 auto;

        /deep/ input::placeholder {
            text-align: right;
        }

        .btn-wrapper {
            width: 100%;
            display: block;
            margin-top: 20px;

            &:after {
                z-index: 0;
            }

            button {
                width: 100%;
                height: 50px;
                font-weight: 600;
                position: relative;
                z-index: 1;
            }
        }

        /deep/ .form-group {
            > div {
                display: flex;
            }
        }
    }
</style>
