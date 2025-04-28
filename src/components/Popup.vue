<script>
export default {
    methods: {
        name: 'Popup',
    }
};
</script>

<template>
    <h2>This is Events Component</h2>
    <form @submit.prevent="handleSubmit">
        <button type="submit">Submit</button>
    </form>
</template>