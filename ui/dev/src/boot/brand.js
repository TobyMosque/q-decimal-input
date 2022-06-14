import { boot } from "quasar/wrappers";
import * as Ui from "ui"; // "ui" is aliased in quasar.conf.js

export default boot(({ app }) => {
  const intl = {
    np4: Ui.useDecimalIntlStore("number.precision.4"),
    brl: Ui.useDecimalIntlStore("currenct.brl"),
    usd: Ui.useDecimalIntlStore("currenct.usd"),
    jpy: Ui.useDecimalIntlStore("currenct.jpy"),
    pyg: Ui.useDecimalIntlStore("currenct.pyg"),
    prc: Ui.useDecimalIntlStore("percentage"),
  };

  intl.np4.style.value = "decimal";
  intl.np4.language.value = "pt-BR";
  intl.np4.precision.value = 4;

  intl.prc.style.value = "percent";
  intl.prc.precision.value = 4; // this field will be ignored

  intl.brl.language.value = "pt-BR";
  intl.brl.style.value = "currency";
  intl.brl.currency.value = "BRL";
  intl.brl.precision.value = 2;

  intl.usd.language.value = "en-US";
  intl.usd.style.value = "currency";
  intl.usd.currency.value = "USD";
  intl.usd.precision.value = 2;

  intl.pyg.language.value = "es-PY";
  intl.pyg.style.value = "currency";
  intl.pyg.currency.value = "PYG";
  intl.pyg.precision.value = 2;

  intl.jpy.language.value = "jp-JP";
  intl.jpy.style.value = "currency";
  intl.jpy.currency.value = "JPY";
  intl.jpy.precision.value = 0;

  const dcmi = {
    out: Ui.useDecimalInputStore("outlined"),
    fil: Ui.useDecimalInputStore("filled"),
  };

  dcmi.out.suffix.value = true;
  dcmi.out.outlined.value = true;

  dcmi.fil.prefix.value = true;
  dcmi.fil.filled.value = true;
});
