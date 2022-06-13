<template>
  <q-page padding>
    <QDecimalInput v-model="value"></QDecimalInput>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
const value = ref(12.34);
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
