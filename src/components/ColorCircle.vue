<script setup>
const props = defineProps({
	color: String,
	label: String,
	circleClassList: Array,
	labelClassList: Array
});

const hasLabel = () => Boolean(props.label);
</script>
<template>
	<div class="flex flex-col items-center m-2">
		<div class="rounded-full border border-gray-300" :style="{ backgroundColor: color }" :class="circleClassList"></div>
		<span v-if="hasLabel()" class="mt-2" :class="labelClassList">{{ label }}</span>
	</div>
</template>
