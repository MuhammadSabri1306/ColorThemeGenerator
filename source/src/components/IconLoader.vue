<style scoped>
svg {
	display: inline-block;
	width: 1em;
	height: 1em;
	overflow: visible;
	font-size: inherit;
	vertical-align: -.125em;
}
</style>
<script setup>
import { defineAsyncComponent } from "vue";

const props = defineProps({ icon: String });
const icon = props.icon.split("-").map(item => item[0].toUpperCase() + item.slice(1)).join("");
const currentIcon = defineAsyncComponent(() => import(`./icons/${ icon }.vue`));
</script>
<template>
	<component :is="currentIcon" />
</template>
