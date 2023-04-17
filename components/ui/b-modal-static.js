import { BModal } from 'bootstrap-vue'
import { BTransporterSingle } from 'bootstrap-vue/src/utils/transporter'

export default {
    extends: BModal,

    computed: {
        modalOuterStyle() {
            // Styles needed for proper stacking of modals
            return {
                position: 'absolute',
                zIndex: this.zIndex,
                display: this.isHidden ? 'none' : 'block'
            }
        }
    },

    render(h) {
        if (this.static) {
            return this.lazy && this.isHidden ? h() : this.makeModal(h)
        } else {
            return h(BTransporterSingle, [this.makeModal(h)])
        }
    }
}
