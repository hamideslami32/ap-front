<template>
    <div class="field px-3 py-2 mb-2 d-flex align-items-center justify-content-between" @click="showModal = true">
        <div>
            <svgicon name="user" width="24" height="24" />
            <span class="text-2 text-gray-800 mr-2">مسافر {{ index }} - {{ passengerType }}</span>
        </div>
        <span class="flex-grow-1 text-left">
            <badge v-if="value.name || value.lastName" class="px-3 py-2">
                {{ value.name }}
                {{ value.lastName }}
            </badge>
        </span>
        <svgicon name="arrow-left" class="text-gray-700 mr-2" width="24" height="24" />

        <b-modal v-model="showModal" hide-footer>
            <template v-slot:modal-title>
                مسافر {{ index | ordinal }} - {{ passengerType }}
            </template>
            <template v-slot:modal-header-close>
                <svgicon name="arrow-long-right" width="20" height="20" />
            </template>
            <div class="add-passengers">
                <b-tabs content-class="mt-5 px-2">
                    <b-tab title="خرید با کد ملی" active @click="nationalPassenger = true">
                        <passenger-form v-model="localValue" @close="showModal = false" />
                    </b-tab>
                    <b-tab title="خرید با پاسپورت" @click="nationalPassenger = false">
                        <passenger-form v-model="localValue" :passport="true" @close="showModal = false" />
                    </b-tab>
                </b-tabs>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Badge from '~/components/ui/Badge'
import PassengerForm from '~/components/passenger/PassengerForm'

export default {
    name: 'PassengerField',
    components: {Badge, PassengerForm},
    props: {
        value: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            showModal: false
        }
    },
    computed: {
        localValue: {
            get() {
                return this.value
            },
            set(x) {
                this.$emit('input', x)
            }
        },

        passengerType() {
            return {
                adult: 'بزرگسال',
                child: 'کودک',
                infant: 'نوزاد'
            }[this.value.type]
        }
    }
}
</script>

<style lang="scss" scoped>
    .field {
        border: 1px solid map_get($grays, '400');
        border-radius: 10px;
        background: #f9f9f9;
        min-height: 50px;

        /deep/ .badge {
            font-weight: 400;
            border: none;
            border-radius: 100px;
            font-size: 0.75rem;
        }
    }
</style>