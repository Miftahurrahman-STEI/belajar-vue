<script>
export default{
    data() {
        return {
            msg: 'Hello Miftah',
            rawHtml: 'Tes interpolate bang'
        }
    }
}
</script>

<template>
    <p>Using v-text directive: <span v-text="msg"></span></p>
    <p>Message: {{ msg }}</p>
    <p>Using text interpolation: {{ rawHtml }}</p>
    <p>Using v-html directive: <span v-html="rawHtml"></span></p>
</template>