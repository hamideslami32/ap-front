<template>
    <div class="account">
        <b-tabs content-class="mt-5 px-2">
            <b-tab title="مشخصات فردی" active @click="editAccount = false">
                <div v-if="!editAccount" class="account__show">
                    <p class="text-3">
                        اطلاعات شخصی
                    </p>
                    <field title="نام و نام خانوادگی" value="سید حسین حسینی" />
                    <field class="mt-2" title="تاریخ تولد" value="72/04/20" />
                    <p class="text-3 mt-5">
                        اطلاعات تماس
                    </p>
                    <field title="نام و نام خانوادگی" value="سید حسین حسینی" :active="true" />
                    <field class="mt-2" title="تاریخ تولد" value="72/04/20" :active="true" />
                </div>
                <div v-else class="account__edit-section">
                    <p class="text-3 text-center">
                        ویرایش اطلاعات شخصی
                    </p>
                    <form>
                        <custom-input title="نام خانوادگی" input-class="input text-3" />
                        <custom-input title="تاریخ تولد" input-class="input text-3" />
                        <a-btn variant="primary" class="submit-btn">
                            تائید ویرایش
                        </a-btn>
                    </form>
                </div>
                <b-button
                    v-if="!editAccount"
                    class="account__edit text-3"
                    variant="outline-info"
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
                    <form>
                        <custom-input type="password" title="رمز عبور فعلی" input-class="input text-3" />
                        <p class="text-3 mt-4">
                            رمز عبور جدید
                        </p>
                        <custom-input type="password" title="رمز عبور جدید" input-class="input text-3" />
                        <custom-input type="password" title="تکرار رمز عبور جدید" input-class="input text-3" />
                        <a-btn variant="primary" class="submit-btn">
                            تغییر رمز عبور
                        </a-btn>
                    </form>
                </div>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import Field from '~/components/ui/Field'
import CustomInput from '~/components/ui/form/CustomInput'

export default {
    name: 'Account',
    components: {CustomInput, Field},
    data() {
        return {
            editAccount: true
        }
    },
    methods: {
        showAccountEdit() {
            this.editAccount = true
        }
    }
}
</script>

<style lang="scss" scoped>
    .account {
        margin-top: -20px;

        .tabs {
            margin: 0 -10px;
        }

        &__show, &__edit-section {
            color: map_get($gray-colors, 'gray-700');
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

            .input {
                margin: 0 auto;
                border-radius: 10px;
                box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
                padding-right: 20px;
                border-color: map_get($gray-colors, 'gray-400');
                /* max-width: 280px; */
            }
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