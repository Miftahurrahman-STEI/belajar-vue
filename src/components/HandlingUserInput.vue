<template>
    <h1>{{ message }}</h1>
    <button @click="reverseMessage">Reverse</button>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Hello World!')

function reverseMessage() {
    message.value = message.value.split('').reverse().join('')
}
</script>