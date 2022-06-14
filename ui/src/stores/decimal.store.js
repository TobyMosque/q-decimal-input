import { reactive, toRefs } from "vue";
import { useInputStore } from "@tobymosque/quasar-ui-q-branded-components";
const map = new Map();

/**
 * @type {import('./index').UseDecimalInputStore}
 */
export function useDecimalInputStore(context = "default") {
  const inputState = useInputStore(context);
  if (!map.has(context)) {
    map.set(
      context,
      toRefs(
        reactive({
          suffix: false,
          prefix: false,
          step: 1,
          cursorOnFocus: "end", // ['start', 'end', 'integer']
          intl: "default",
        })
      )
    );
  }
  const decimalState = map.get(context);
  return {
    ...inputState,
    ...decimalState,
  };
}
