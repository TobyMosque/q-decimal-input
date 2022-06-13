import { reactive, computed, toRefs } from "vue";
import { Quasar } from "quasar";
const map = new Map();

/**
 * @type {import('./index').UseDecimalIntlStore}
 */
export function useDecimalInputStore(context) {
  if (!map.has(context)) {
    const state = reactive({
      prefix: undefined,
      suffix: undefined,
      step: 2,
    });

    const { locale, style, currency, display, places, precision } =
      toRefs(state);
    const language = computed({
      get() {
        return (
          (locale.value || Quasar.lang.isoName || navigator.language) +
          "-u-nu-latn"
        );
      },
      set(val) {
        locale.value = val;
      },
    });
    const limit = computed(() =>
      places.value && places.value + places.precision <= 16
        ? this.places + this.precision
        : 16
    );
    const label = computed(() => {
      switch (style.value) {
        case "currency":
          const placebo = 12.34;
          const value = this.valueFormatter.format(placebo);
          const number = this.numberFormatter.format(placebo);
          return value.replace(number, "").trim();
        case "percent":
          return "%";
        case "decimal":
        default:
          return "";
      }
    });

    const formatters = {
      currency: computed(() =>
        Intl.NumberFormat(language.value, {
          style: style.value,
          currency: currency.value,
          currencyDisplay: display.value,
          minimumFractionDigits: precision.value,
          maximumFractionDigits: precision.value,
        })
      ),
      decimal: computed(() =>
        Intl.NumberFormat(language.value, {
          style: style.value,
          minimumFractionDigits: precision.value,
          maximumFractionDigits: precision.value,
        })
      ),
      percent: computed(() =>
        Intl.NumberFormat(language.value, {
          style: "percent",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      ),
    };
    function format(val, formatter) {
      if (!val || typeof val !== "number") {
        return "";
      }
      if (formatter) {
        return formatter.format(val);
      }
      switch (style.value) {
        case "currency":
          return formatters.currency.value.format(val);
        case "percent":
          return formatters.percent.value.format(val);
        case "decimal":
        default:
          return formatters.decimal.value.format(val);
      }
    }
    map.set(context, {
      language,
      style,
      currency,
      display,
      places,
      precision,
      label,
      limit,
      format,
      formatters,
    });
  }
  return map.get(context);
}
