<template>
    <v-observer v-slot="{ handleSubmit }" slim>
        <form action="" class="passenger-form" @submit.prevent="handleSubmit(submit)">
            <v-provider v-slot="{ errors }" name="نام" rules="latinWord|required" slim>
                <b-form-group class="mb-2" :state="errors.length ? false : null" :invalid-feedback="errors[0]">
                    <a-input
                        v-model="localValue.name"
                        dir="ltr"
                        placeholder="نام به لاتین"
                        :state="errors.length ? false : null"
                    />
                </b-form-group>
            </v-provider>
            <v-provider v-slot="{ errors }" name="نام خانوادگی" rules="latinWord|required" slim>
                <b-form-group class="mb-2" :state="errors.length ? false : null" :invalid-feedback="errors[0]">
                    <a-input
                        v-model="localValue.surname"
                        dir="ltr"
                        placeholder="نام خانوادگی به لاتین"
                        :state="errors.length ? false : null"
                    />
                </b-form-group>
            </v-provider>
            <p class="text-3 text-gray-700 text-center my-3">
                جنسیت مسافر
            </p>

            <v-provider v-slot="{ errors }" name="جنسیت" rules="required" slim>
                <b-form-group
                    class="mb-3"
                    :state="errors.length ? false : null"
                    :invalid-feedback="errors[0]"
                >
                    <b-form-radio
                        v-model="localValue.gender"
                        class="ml-0"
                        value="male"
                        :class="{ active: localValue.gender === 'male' }"
                        inline
                        :state="errors.length ? false : null"
                    >
                        مرد
                    </b-form-radio>
                    <b-form-radio
                        v-model="localValue.gender"
                        class="ml-0 float-left"
                        value="female"
                        :class="{ active: localValue.gender === 'female' }"
                        inline
                        :state="errors.length ? false : null"
                    >
                        زن
                    </b-form-radio>
                </b-form-group>
            </v-provider>
            <template v-if="!passport">
                <v-provider v-slot="{ errors }" rules="nationalCode|required" name="کد ملی" slim>
                    <b-form-group class="mb-2" :state="errors.length ? false : null" :invalid-feedback="errors[0]">
                        <a-input
                            v-model="localValue.nationalCode"
                            maxlength="10"
                            inputmode="numeric"
                            placeholder="کد ملی"
                            :state="errors.length ? false : null"
                        />
                    </b-form-group>
                </v-provider>
            </template>
            <template v-else>
                <v-provider v-slot="{ errors }" rules="required" name="شماره پاسپورت" slim>
                    <b-form-group class="mb-2" :state="errors.length ? false : null" :invalid-feedback="errors[0]">
                        <a-input
                            v-model="localValue.passportNumber"
                            placeholder="شماره پاسپورت"
                            :state="errors.length ? false : null"
                        />
                    </b-form-group>
                </v-provider>
                <v-provider v-slot="{ errors, failedRules }" rules="required|date|age:-0.5,-9999" name="تاریخ انقضای پاسپورت" slim>
                    <b-form-group class="mb-2" :state="errors.length ? false : null" :invalid-feedback="failedRules.age ? 'تاریخ انقضا پاسپورت باید حداقل ۶ ماه باشد' : errors[0]">
                        <a-date-input
                            v-model="localValue.passportExpiration"
                            maxlength="10"
                            dir="ltr"
                            inputmode="numeric"
                            placeholder="تاریخ انقضای پاسپورت"
                            :state="errors.length ? false : null"
                        />
                    </b-form-group>
                </v-provider>
                <v-provider v-slot="{ errors }" rules="required" name="کشور صادر کننده پاسپورت" slim>
                    <b-form-group class="mb-2" :state="errors.length ? false : null" :invalid-feedback="errors[0]">
                        <b-form-select
                            v-model="localValue.nationality"
                            :state="errors.length ? false : null"
                            :invalid-feedback="errors[0]"
                            :options="nationalities"
                        >
                            <template v-slot:first>
                                <b-form-select-option :value="null" disabled>
                                    کشور صادر کننده پاسپورت
                                </b-form-select-option>
                            </template>
                        </b-form-select>
                    </b-form-group>
                </v-provider>
            </template>
            <v-provider v-slot="{ errors, failedRules }" name="تاریخ تولد" :rules="`required|date|age:${ageRange.join(',')}`" slim>
                <b-form-group class="mb-2" :state="errors.length ? false : null" :invalid-feedback="failedRules.age ? 'سن وارد شده صحیح نمی باشد' : errors[0]">
                    <a-date-input
                        v-model="localValue.birthdate"
                        dir="ltr"
                        class="mb-2"
                        placeholder="تاریخ تولد (شمسی یا میلادی)"
                        inputmode="numeric"
                        maxlength="10"
                        :state="errors.length ? false : null"
                    />
                </b-form-group>
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
import AInput from '~/components/ui/form/AInput'
import ADateInput from '~/components/ui/form/ADateInput'
import cloneDeep from 'lodash/cloneDeep'
import '~/plugins/veeValidate/rules/nationalCode'
import '~/plugins/veeValidate/rules/latinWord'
import '~/plugins/veeValidate/rules/required'
import '~/plugins/veeValidate/rules/dateValidation'
import {flightApi} from '~/api/flightApi'

let nationalities

export default {
    name: 'PassengerForm',
    components: {AInput, ADateInput},
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
            localValue: cloneDeep(this.value),
            nationalities: nationalities
        }
    },
    computed: {
        ageRange() {
            return {
                adult: [12, 9999],
                child: [2, 12],
                infant: [0, 2]
            }[this.localValue.type]
        }
    },
    async mounted() {
        if (!nationalities) {
            this.nationalities = nationalities = await flightApi.getNationalities()
        }
    },
    methods: {
        submit() {
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
    }
</style>
