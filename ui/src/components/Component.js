import { h } from 'vue'
import { QBadge } from 'quasar'

export default {
  name: 'QDecimalInput',

  setup () {
    return () => h(QBadge, {
      class: 'QDecimalInput',
      label: 'QDecimalInput'
    })
  }
}
