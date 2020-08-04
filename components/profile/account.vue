<template>
    <div class="account">
        <b-tabs content-class="mt-5 px-2">
            <b-tab title="مشخصات فردی" active>
                <div class="account__show">
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
            </b-tab>
            <b-tab title="رمز عبور">
                <p>I'm the second tab</p>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import Field from '~/components/ui/Field'
export default {
    name: 'Account',
    components: {Field}
}
</script>

<style lang="scss" scoped>
    .account{
        margin-top: -20px;
        .tabs{
            margin: 0 -10px;
        }

        &__show{
            color: map_get($gray-colors, 'gray-700');
        }
    }
</style>