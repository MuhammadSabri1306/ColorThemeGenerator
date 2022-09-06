<style scoped>
svg.icon-inline {
	display: inline-block;
	width: 1em;
	height: 1em;
	overflow: visible;
	font-size: inherit;
	vertical-align: -.125em;
}
</style>
<script setup>
import { computed, defineAsyncComponent, useAttrs } from "vue";

const props = defineProps({ icon: String });
const icon = props.icon.split("-").map(item => item[0].toUpperCase() + item.slice(1)).join("");
const currentIcon = defineAsyncComponent(() => import(`./icons/${ icon }.vue`));

const attrs = useAttrs();
const iconClass = computed(() => attrs.class || "icon-inline");
</script>
<template>
	<component :is="currentIcon" v-once :class="iconClass" />
</template>
