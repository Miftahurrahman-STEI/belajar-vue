<template>
    <div>
        {{ a }}
    </div>
</template>

<script setup>
var data = {a: 1}

var vm = new Vue({
    data: data,
})

vm.a
vm.$data === data

var component = Vue.extend({
    data: function () {
        return {a: 1}
    },
})

var vm = new component()
vm.a
vm.$data === vm._data
</script>