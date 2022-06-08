<script setup>
const props = defineProps({
	color: String,
	label: String,
	circleClassList: Array,
	labelClassList: Array,
	labelPosition: String
});

const hasLabel = () => Boolean(props.label);

const wrapperClass = {
	"flex-col": !hasLabel() || !Boolean(props.labelPosition) || props.labelPosition == "bottom",
	"flex-col-reverse": Boolean(props.labelPosition) && props.labelPosition == "top",
	"flex-row-reverse": Boolean(props.labelPosition) && props.labelPosition == "left"
};

const labelClass = () => {
	const classList = {
		"mt-2": !hasLabel() || !Boolean(props.labelPosition) || props.labelPosition == "bottom",
		"mb-2": Boolean(props.labelPosition) && props.labelPosition == "top",
		"mr-2": Boolean(props.labelPosition) && props.labelPosition == "left",
		"mr-l": Boolean(props.labelPosition) && props.labelPosition == "right"
	};

	if(!Boolean(props.labelClassList))
		return classList;

	props.labelClassList.forEach(className => classList[className] = true);
	return classList;
};
</script>
<template>
	<div class="flex items-center" :class="wrapperClass">
		<div class="rounded-full border border-gray-300" :style="{ backgroundColor: color }" :class="circleClassList"></div>
		<span v-if="hasLabel()" :class="labelClass()">{{ label }}</span>
	</div>
</template>
