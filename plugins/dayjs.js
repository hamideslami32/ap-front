import Vue from 'vue'
import dayjs from 'dayjs'
import jalaliDay from 'jalaliday'

dayjs.extend(jalaliDay)
dayjs.locale('fa')
dayjs.calendar('jalali')

Vue.prototype.$dayjs = dayjs
