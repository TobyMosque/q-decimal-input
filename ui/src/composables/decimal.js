import {
  useBrand,
  useGetValue,
  useInputMethods,
} from "@tobymosque/quasar-ui-q-branded-components";
import { computed } from "vue";
import { useDecimalInputStore } from "../stores";

export function useDecimalMethods() {
  const { root, methods: inputMethods } = useInputMethods();
  const decimalMethods = {
    ...inputMethods,
  };
  return {
    root,
    methods: decimalMethods,
  };
}

export function useDecimalProps({ props, name = "decimalInput" }) {
  const { brand } = useBrand({ props, name });

  const store = computed(() => useDecimalInputStore(brand.value));
  const { getValue } = useGetValue({ props, store });

  const decimalProps = {
    suffix: computed(() => getValue("suffix")),
    prefix: computed(() => getValue("prefix")),
    step: computed(() => getValue("step")),
    cursorOnFocus: computed(() => getValue("cursorOnFocus")),
    intl: computed(() => getValue("intl")),
  };
  return {
    props: decimalProps,
  };
}
