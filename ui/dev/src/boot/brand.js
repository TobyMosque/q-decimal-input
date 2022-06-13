import { boot } from "quasar/wrappers";
import * as Ui from "ui"; // "ui" is aliased in quasar.conf.js

export default boot(({ app }) => {
  const intl = {
    np4: Ui.useDecimalIntlStore('number.precision.4'),
    brl: Ui.useDecimalIntlStore('currenct.brl'),
    usd: Ui.useDecimalIntlStore('currenct.usd'),
    jpy: Ui.useDecimalIntlStore('currenct.jpy'),
    prc: Ui.useDecimalIntlStore('percentage')
  }

    const dcmi = {
      np4: useDecimalInputStore('number.precision.4'),
      brl: useDecimalInputStore('currenct.brl'),
      usd: useDecimalInputStore('currenct.usd'),
      jpy: useDecimalInputStore('currenct.jpy'),
      prc: useDecimalInputStore('percentage')
    }
  
intl.np4.style.value = "decimal"
intl.np4.language.value = "pt-BR"
intl.np4.precision.value = 4

dcmi.np4.suffix.value = 'My Suffix'
dcmi.np4.outlined.value = true

intl.prc.style.value = "percent"
intl.prc.precision.value = 4 // this field will be ignored

dcmi.prc.suffix.value = true
dcmi.prc.outlined.value = true

intl.brl.language.value = "pt-BR"
intl.brl.style.value = "currency"
intl.brl.currency.value = "BRL"
intl.brl.precision.value = 2

dcmi.brl.prefix.value = true
dcmi.brl.filled.value = true

intl.usd.language.value = "en-US"
intl.usd.style.value = "currency"
intl.usd.currency.value = "USD"
intl.usd.precision.value = 2

dcmi.usd.prefix.value = true
dcmi.usd.filled.value = true

intl.jpy.language.value = "jp-JP"
intl.jpy.style.value = "currency"
intl.jpy.currency.value = "JPY"
intl.jpy.precision.value = 0

dcmi.jpy.step.value = 100
dcmi.jpy.prefix.value = true
dcmi.jpy.filled.value = true
});