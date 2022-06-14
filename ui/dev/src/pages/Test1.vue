<template>
  <q-page padding>
    <div class="q-gutter-sm" style="max-width: 300px">
      <QSelect v-model="intl" :options="intlOptions" label="Intl"></QSelect>
      <QSelect v-model="brand" :options="brandOptions" label="Brand"></QSelect>
      <QDecimalInput
        v-model="value"
        :intl="intl"
        :brand="brand"
        cursor-on-focus="end"
        label="Cursor on Focus: End"
      ></QDecimalInput>
      <QDecimalInput
        v-model="value"
        :intl="intl"
        :brand="brand"
        cursor-on-focus="start"
        label="Cursor on Focus: Start"
      ></QDecimalInput>
      <QDecimalInput
        v-model="value"
        :intl="intl"
        :brand="brand"
        cursor-on-focus="integer"
        label="Cursor on Focus: Integer"
      ></QDecimalInput>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { QSelect } from "quasar";

const intlOptions = ref([
  "number.precision.4",
  "currenct.usd",
  "currenct.brl",
  "currenct.jpy",
  "currenct.pyg",
  "percentage",
]);

const brandOptions = ref(["filled", "outlined"]);

const value = ref(12345.12);
const brand = ref("filled");
const intl = ref("currenct.usd");
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
