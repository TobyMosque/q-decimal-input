<template>
  <q-page padding>
    <div style="max-width: 300px;">
      <QSelect v-model="brand" :options="options" label="Brand"></QSelect>
      <QDecimalInput v-model="value" :brand="brand"></QDecimalInput>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { QSelect } from "quasar";

const options = ref([
  'number.precision.4',
  'currenct.usd',
  'currenct.brl',
  'currenct.jpy',
  'percentage'
])

const value = ref(12345.12);
const brand = ref('currenct.usd');
const prefix = ref(true);
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
