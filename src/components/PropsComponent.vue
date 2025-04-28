<script>
export default {
    props: ['foodName', 'foodDesc', 'isFavorit'],
    data() {
        return {
            foodIsFavorite: this.isFavorit
        }
    },
    methods: {
        toggleFavorite() {
            this.$emit('toggle-favorite');
        }
    }
}
// const props = defineProps(['foodName','foodDesc','isFavorite']);
</script>

<template>
    <div>
        <h2>
            {{ foodName }}
            <img src="../assets/img_quality.svg" v-show="foodIsFavorite">
        </h2>
        <p>{{ foodDesc }}</p>
        <button @click="toggleFavorite">Favorite</button>
    </div>
</template>

<style>
    img {
        height: 1.5em;
        float: right;
    }
</style>