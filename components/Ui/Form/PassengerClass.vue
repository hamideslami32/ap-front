<template>
    <div class="passenger-class">
        <b-form-group>
            <b-form-radio v-model="selected" name="some-radios" value="economy">
                اکونومی کلاس
            </b-form-radio>
            <b-form-radio v-model="selected" name="some-radios" value="business">
                بیزنس کلاس
            </b-form-radio>
            <b-form-radio v-model="selected" name="some-radios" value="first">
                فرست کلاس
            </b-form-radio>
        </b-form-group>
    </div>
</template>

<script>
export default {
    name: 'PassengerClass',
    data() {
        return {
            selected: 'economy'
        }
    }
}
</script>

<style lang="scss">
.passenger-class {
    .custom-radio {
        text-align: right;
        padding-left: 0;
        padding-right: 1.5rem;

        &:not(:last-child) {
            padding-bottom: 10px;
        }

        cursor: pointer;

        .custom-control-input {
            right: 0;
            cursor: pointer;
        }

        .custom-control-label {
            cursor: pointer;

            &:before, &:after {
                right: -1.5rem;
                left: 0;
            }
        }
    }
}
</style>