<script setup>
const isLoading = true
const objectOfAttrs = {
  disabled: isLoading,
  class: 'text-3xl bg-black text-white',
}

const renderIsLoading = () => {
  if (isLoading) {
    return 'Loading'
  } else {
    return 'Submit'
  }
}

defineOptions({
  name: 'MainButton',
})
</script>

<template>
  <button v-bind="objectOfAttrs">{{ renderIsLoading() }}</button>
</template>

<style scoped></style>
