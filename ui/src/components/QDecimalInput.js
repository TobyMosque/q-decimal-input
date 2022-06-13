import { h, computed } from "vue";
import { useDecimalIntlStore, useDecimalInputStore } from "../stores";
import {
  QbInput,
  useInputMethods,
} from "@tobymosque/quasar-ui-q-branded-components";

export default {
  name: "QDecimalInput",
  props: {
    provide: String,
    suffix: [String, Boolean],
    prefix: [String, Boolean],
    modelValue: Number,
  },
  setup(props, { attrs, emit, expose, slots }) {
    const { root, methods } = useInputMethods();
    const defaults = useDecimalInputStore();
    const provide = computed(() => props.provide || defaults.provide.value);
    const store = computed(() => useDecimalIntlStore(provide.value));

    const suffix = computed(() =>
      props.suffix
        ? typeof props.suffix === "boolean"
          ? store.value.text.value
          : props.suffix
        : ""
    );
    const prefix = computed(() =>
      props.prefix
        ? typeof props.prefix === "boolean"
          ? store.value.text.value
          : props.prefix
        : ""
    );

    const formatter = computed(() => {
      if (prefix.value || suffix.value) {
        return store.value.formatters.decimal.value;
      }
      return undefined;
    });
    const model = computed(() => props.modelValue);
    const text = computed(() =>
      store.value.format(model.value, formatter.value)
    );
    function setText(val) {
      console.log(val);
      let numbers = val.replace(/\D/gi, "") || "0";
      const limit = store.value.limit.value;
      if (numbers.length > limit) {
        numbers = numbers.substring(numbers.length - limit);
      }
      const interger = parseInt(numbers);
      const decimal = interger / Math.pow(10, store.value.precision.value);
      emit("update:modelValue", decimal);
    }
    expose({ refs: { root }, ...methods });

    function updateCursor(evt) {
      if (!evt) {
        return;
      }
      const { target: target, shiftKey: shiftKey, keyCode: keyCode } = evt;
      const { selectionStart: start, selectionEnd: end, value: value } = target;
      requestAnimationFrame(() => {
        let len,
          inc,
          pos = 1;
        switch (true) {
          case !shiftKey && [38, 40].indexOf(keyCode) !== -1:
          case keyCode === 46:
            target.selectionStart = target.selectionEnd = end;
            break;
          case keyCode === 8:
          case value !== target.value:
            len = { new: target.value.length, old: value.length };
            inc = len.new - len.old;
            pos = end + inc < 0 ? end : end + inc;
            target.selectionStart = target.selectionEnd = pos;
            break;
        }
      }, 0);
    }

    return () =>
      h(
        QbInput,
        {
          ...attrs,
          ref: root,
          modelValue: text,
          "onUpdate:modelValue": setText,
          class: "QDecimalInput",
          label: "QDecimalInput",
          onkeydown(evt) {
            updateCursor(evt);
          },
          oninput(evt) {
            updateCursor(evt);
          },
          onkeyup(evt) {
            updateCursor(evt);
          },
          onfocus() {
            const el = root.value.$el.querySelector("input");
            requestAnimationFrame(() => {
              el.selectionStart = el.selectionEnd = el.value.length;
            });
          },
        },
        slots
      );
  },
};
