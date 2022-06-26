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
import SolidEnvelopeIcon from "./SolidEnvelopeIcon.vue";
import SolidGithubIcon from "./SolidGithubIcon.vue";
import SolidInstagramIcon from "./SolidInstagramIcon.vue";
import SolidLinkedinIcon from "./SolidLinkedinIcon.vue";

const icon = { SolidEnvelopeIcon, SolidGithubIcon, SolidInstagramIcon, SolidLinkedinIcon };
const props = defineProps({ icon: String });
const currentIcon = icon[props.icon];
</script>
<template>
	<component :is="currentIcon" />
</template>
