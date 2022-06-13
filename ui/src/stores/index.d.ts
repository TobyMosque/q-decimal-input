import { ToRefs } from "vue";

export interface DecimalIntlProps {
  locale: String;
  style: "decimal" | "currency" | "percent";
  currency: String;
  display: "symbol" | "code" | "name";
  places: undefined;
  precision: Number;
  text: String;
  formatters: {
    currency: Intl.NumberFormat;
    decimal: Intl.NumberFormat;
    percent: Intl.NumberFormat;
  };
}

export interface DecimalInputProps {
  provide: String;
}

export type DecimalInputStore = ToRefs<DecimalInputProps>;
export function useDecimalInputStore(): DecimalInputStore;
export type UseDecimalProvideStore = typeof useDecimalInputStore;

export interface DecimalIntlStore extends ToRefs<DecimalIntlProps> {
  label: ComputedRef<String>;
  limit: ComputedRef<Number>;
  format(val: Number, formatter?: Intl.NumberFormat = undefined): string;
  formatters: {
    currency: ComputedRef<Intl.NumberFormat>;
    decimal: ComputedRef<Intl.NumberFormat>;
    percent: ComputedRef<Intl.NumberFormat>;
  };
}
export function useDecimalIntlStore(context: String): DecimalIntlStore;
export type UseDecimalIntlStore = typeof useDecimalIntlStore;
