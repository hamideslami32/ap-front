<template>
    <div class="passengers px-2 mt-3">
        <portal to="header">
            مسافران
        </portal>
        <card v-for="i in 4" :key="i" class="mb-3">
            <template #header>
                <div class="passengers-details__main text-2">
                    <div class="d-flex align-items-center justify-content-between px-2">
                        <span>نام و نام خانوادگی</span>
                        <span class="text-gray-800">سید حسین حسینی</span>
                    </div>
                    <div class="d-flex my-2 align-items-center justify-content-between px-2">
                        <span>کدملی</span>
                        <span>۰۰۱۱۴۹۷۸۱۵</span>
                    </div>
                    <div class="d-flex mb-2 align-items-center justify-content-between px-2">
                        <span>شماره پاسپورت</span>
                        <span>-</span>
                    </div>
                    <div class="d-flex align-items-center justify-content-between px-2">
                        <span>تاریخ تولد</span>
                        <span>۱۵ بهمن ۱۳۶۸</span>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="custom-card__actions__btn" @click="editPassenger = true">
                    <svgicon class="text-primary" name="bookmarks-denny" width="26" height="26" />
                    <span class="text-1 mt-2 text-gray-900">ویرایش مسافر</span>
                </div>
                <div class="custom-card__actions__btn" @click="removeModal = true">
                    <svgicon class="text-secondary" name="bookmarks-accept" width="26" height="26" />
                    <span class="text-1 mt-2 text-gray-900">حذف مسافر</span>
                </div>
            </template>
        </card>

        <a-btn wrapper-class="search-btn" variant="primary" @click="searchModal = true">
            جستجو
        </a-btn>
        <b-modal v-model="searchModal" body-class="p-0" hide-footer>
            <template v-slot:modal-title>
                جستجو مسافر
            </template>
            <template v-slot:modal-header-close>
                <svgicon name="arrow-left" width="20" height="20" />
            </template>
            <div class="search-passengers">
                <p class="text-3 text-gray-700 text-center mt-4">
                    پر کردن حداقل یک فیلد کافیست
                </p>
                <form action="">
                    <custom-input title="نام" />
                    <custom-input title="نام خانوادگی" />
                    <custom-input title="کد ملی" />
                    <custom-input title="شماره پاسپورت" />
                    <a-btn variant="primary" class="submit-btn" type="submit">
                        جستجو
                    </a-btn>
                </form>
            </div>
        </b-modal>
        <b-modal v-model="editPassenger" body-class="p-0" hide-footer>
            <template v-slot:modal-title>
                ویرایش مسافر
            </template>
            <template v-slot:modal-header-close>
                <svgicon name="arrow-left" width="20" height="20" />
            </template>
            <div class="mt-3">
                <passenger-form v-model="passengerInfo" @close="editPassenger = false" />
            </div>
        </b-modal>

        <b-modal
            id="center-modal"
            v-model="removeModal"
            hide-footer
            hide-header
            centered
            title="remove-passenger"
        >
            <div class="text-center passengers__remove-modal">
                <svgicon name="user-remove" class="text-gray-700 " width="50" height="50" />
                <p class="text-3 mt-2 mb-3 text-gray-black text-weight-500">
                    حذف مسافر (حسین شریفی نیا)
                </p>
                <div class="passengers__remove-modal__actions">
                    <a-btn variant="primary" class="submit-btn text-weight-600" wrapper-class="text-2" @click.prevent="removeModal = false">
                        بازگشت
                    </a-btn>
                    <b-button
                        class="remove-btn text-2 mr-1 text-weight-500"
                        variant="outline-secondary"
                    >
                        حذف کنید
                    </b-button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Card from '~/components/ui/Card'
import CustomInput from '~/components/ui/form/CustomInput'
import PassengerForm from '~/components/passenger/PassengerForm'

export default {
    name: 'Passengers',
    components: {PassengerForm, Card, CustomInput},
    layout: 'page',
    data() {
        return {
            searchModal: false,
            removeModal: false,
            editPassenger: false,
            passengerInfo: {
                name: '',
                type: 'adult',
                lastName: null,
                gender: null,
                nationalCode: null,
                birthdate: null,
                passportCode: null,
                passportDate: null,
                passportCity: null
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .passengers {
        &__main {
            border-top: 1px solid map_get($grays, '500');
            padding-top: 20px;
        }

        /deep/ .search-btn {
            font-size: 0.8em;
            position: fixed;
            bottom: 20px;
            margin: auto;
            left: 50%;
            transform: translateX(-50%);

            .btn {
                width: 140px;
                height: 40px;
                position: relative;
            }
        }

        &__remove-modal {
            &__actions {
                .submit-btn , .remove-btn {
                    min-width: 120px;
                    height: 40px;
                }
            }
        }

    }

    .search-passengers {
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
    }
</style>
