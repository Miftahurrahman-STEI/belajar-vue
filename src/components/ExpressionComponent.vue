<script setup>
    const number = 1
    const isSuccess = true
    const message = 'Hallo saya adalah seorang Sofware Engineer'
</script>

<template>
    <p>Using expression: {{ number + 10}}</p>
    <p>Using loop expression: {{ isSuccess ? 'Yes' : 'No' }}</p>
    <p>Using array: {{ message.split('').reverse().join('') }}</p>
</template>