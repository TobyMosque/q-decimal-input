import { h, computed } from "vue";
import { useDecimalIntlStore } from "../stores";
import { useDecimalProps, useDecimalMethods } from "../composables";
import {
  QbInput,
  useBrand,
  mergeProps,
} from "@tobymosque/quasar-ui-q-branded-components";

export const DecimalInputProps = {
  brand: {
    type: String,
    default: 'default'
  },
  suffix: {
    type: [String, Boolean],
    default: undefined
  },
  prefix: {
    type: [String, Boolean],
    default: undefined
  },
  modelValue: {
    type: Number,
    default: undefined
  },
}

export default {
  name: "QDecimalInput",
  props: DecimalInputProps,
  setup(props, { attrs, emit, expose, slots }) {
    const { props: decimalProps } = useDecimalProps({ props });
    const { root, methods } = useDecimalMethods();
    expose({ refs: { root }, ...methods });

    const { brand } = useBrand({ props, name: 'decimalInput' });
    const intlStore = computed(() => {
      return useDecimalIntlStore(brand.value)
    });

    const { prefix, suffix } = decimalProps
    const _suffix = computed(() =>
      suffix.value
        ? typeof suffix.value === "boolean"
          ? intlStore.value.label.value
          : suffix.value
        : undefined
    );
    const _prefix = computed(() =>
      prefix.value
        ? typeof prefix.value === "boolean"
          ? intlStore.value.label.value
          : prefix.value
        : undefined
    );

    const step = computed(() => props.step);
    const model = computed(() => props.modelValue);
    const text = computed(() =>
      intlStore.value.format(model.value, prefix.value || suffix.value)
    );
    function setText(val) {
      let numbers = val.replace(/\D/gi, "") || "0";
      const limit = intlStore.value.limit.value;
      if (numbers.length > limit) {
        numbers = numbers.substring(numbers.length - limit);
      }
      const interger = parseInt(numbers);
      const decimal = interger / Math.pow(10, intlStore.value.precision.value);
      emit("update:modelValue", decimal);
    }

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

    function incValueByStep (evt) {
      const { target, currentTarget, shiftKey, keyCode } = evt
      if (target !== currentTarget) {
        return
      }
      if (shiftKey || ![38, 40].includes(keyCode)) {
        return
      }
      requestAnimationFrame(() => {
        switch (keyCode) {
          case 38: 
            emit("update:modelValue", model.value + decimalProps.step.value);
            break
          case 40: 
            if (model.value - decimalProps.step.value > 0) {
              emit("update:modelValue", model.value - decimalProps.step.value);
            } else {
              emit("update:modelValue", 0);
            }
            break
        }
      })
    }
    
    return () => {
      const _props = mergeProps({ root, attrs, props: decimalProps });
      return h(QbInput, {
        ..._props,
        modelValue: text,
        "onUpdate:modelValue": setText,
        brand: brand.value,
        prefix: _prefix.value,
        suffix: _suffix.value,
        onkeydown(evt) {
          updateCursor(evt);
        },
        oninput(evt) {
          updateCursor(evt);
        },
        onkeyup(evt) {
          incValueByStep(evt);
        },
        onfocus() {
          const el = root.value.$el.querySelector("input");
          requestAnimationFrame(() => {
            el.selectionStart = el.selectionEnd = el.value.length;
          });
        },
      }, slots);
    }
  },
};
