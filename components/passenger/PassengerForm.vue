<template>
    <form action="" class="passenger-form" @submit.prevent="submit">
        <custom-input v-model="localValue.name" dir="ltr" title="نام به لاتین" />
        <custom-input v-model="localValue.lastName" dir="ltr" title="نام خانوادگی به لاتین" />
        <p class="text-3 text-gray-700 text-center my-3">
            جنسیت مسافر
        </p>

        <b-form-group class="en font-weight-medium">
            <b-form-radio
                v-model="localValue.gender"
                class="mb-2 ml-0"
                value="male"
                :class="{ active: localValue.gender === 'male' }"
                inline
            >
                مرد
            </b-form-radio>
            <b-form-radio
                v-model="localValue.gender"
                class="mb-2 ml-0 mr-auto"
                value="female"
                :class="{ active: localValue.gender === 'female' }"
                inline
            >
                زن
            </b-form-radio>
        </b-form-group>
        <template v-if="!passport">
            <custom-input v-model="localValue.nationalCode" title="کد ملی" />
            <custom-input v-model="localValue.birthdate" title="تاریخ تولد" />
        </template>
        <template v-else>
            <custom-input v-model="localValue.passportCode" title="شماره پاسپورت" />
            <custom-input v-model="localValue.passportDate" title="تاریخ انقضای پاسپورت" />
            <b-form-select v-model="localValue.passportCity" :options="options" />
        </template>
        <a-btn variant="primary" class="submit-btn" type="submit">
            ثبت
        </a-btn>
    </form>
</template>

<script>
import CustomInput from '~/components/ui/form/CustomInput'
import cloneDeep from 'lodash/cloneDeep'

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
            gender: 'male',
            country: null,
            localValue: cloneDeep(this.value),
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
        padding: 0 40px;

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