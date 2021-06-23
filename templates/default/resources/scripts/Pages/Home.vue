<template>
	<h1 class="text-green-400 text-xl">{{ welcomeMessage }}</h1>
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
