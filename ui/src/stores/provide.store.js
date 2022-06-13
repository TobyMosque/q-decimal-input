import { reactive, toRefs } from "vue";

const state = toRefs(
  reactive({
    provide: "default",
  })
);

/**
 * @type {import('./index').UseDecimalProvideStore}
 */
export function useDecimalProvideStore() {
  return state;
}
