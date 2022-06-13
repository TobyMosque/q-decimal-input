import { ToRefs } from "vue";
import { InputProps } from '@tobymosque/quasar-ui-q-branded-components/src/stores';

export interface DecimalIntlProps {
  locale: String;
  style: "decimal" | "currency" | "percent";
  currency: String;
  display: "symbol" | "code" | "name";
  places: undefined;
  precision: Number;
}

export interface DecimalInputProps extends InputProps {
  prefix: String | Boolean,
  suffix: String | Boolean,
  step: Number,
}

export type DecimalInputStore = ToRefs<DecimalInputProps>;
export function useDecimalInputStore(): DecimalInputStore;
export type UseDecimalInputStore = typeof useDecimalInputStore;

export interface DecimalIntlStore extends ToRefs<DecimalIntlProps> {
  label: ComputedRef<String>;
  limit: ComputedRef<Number>;
  format(val: Number, formatter?: Intl.NumberFormat = undefined): string;
  formatters: {
    currency: ComputedRef<Intl.NumberFormat>;
    decimal: ComputedRef<Intl.NumberFormat>;
    percent: ComputedRef<Intl.NumberFormat>;
    precision0: ComputedRef<Intl.NumberFormat>;
  };
}
export function useDecimalIntlStore(context: String): DecimalIntlStore;
export type UseDecimalIntlStore = typeof useDecimalIntlStore;
