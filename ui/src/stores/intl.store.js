import { reactive, computed, toRefs } from "vue";
import { Quasar } from "quasar";
const map = new Map();

/**
 * @type {import('./index').UseDecimalIntlStore}
 */
export function useDecimalIntlStore(context) {
  if (!map.has(context)) {
    const state = reactive({
      locale: undefined,
      style: "decimal",
      currency: undefined,
      display: "symbol",
      places: undefined,
      precision: 2,
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

    const formatters = {
      currency: computed(() =>
        style.value === "currency"
          ? new Intl.NumberFormat(language.value, {
              style: style.value,
              currency: currency.value,
              currencyDisplay: display.value,
              minimumFractionDigits: precision.value,
              maximumFractionDigits: precision.value,
            })
          : undefined
      ),
      decimal: computed(
        () =>
          new Intl.NumberFormat(language.value, {
            style: "decimal",
            minimumFractionDigits: precision.value,
            maximumFractionDigits: precision.value,
          })
      ),
      percent: computed(
        () =>
          new Intl.NumberFormat(language.value, {
            style: "percent",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })
      ),
      precision0: computed(
        () =>
          new Intl.NumberFormat(language.value, {
            style: "decimal",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })
      ),
    };
    const label = computed(() => {
      switch (style.value) {
        case "currency":
          const placebo = 12.34;
          const value = formatters.currency.value.format(placebo);
          const number = formatters.decimal.value.format(placebo);
          return value.replace(number, "").trim();
        case "percent":
          return "%";
        case "decimal":
        default:
          return "";
      }
    });
    function format(val, label) {
      if ((!val && val !== 0) || typeof val !== "number") {
        return "";
      }
      if (label) {
        switch (style.value) {
          case "currency":
            return formatters.decimal.value.format(val);
          case "percent":
            return formatters.precision0.value.format(val);
        }
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
