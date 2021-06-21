<template>
	<h1>{{ welcomeMessage }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'App',

    computed: {
        welcomeMessage() {
            return this.$page.props.welcomeMessage;
        }
    }
});
</script>
