<script setup>
import { ref, reactive } from "vue";
import BrandHeader from "./components/BrandHeader.vue";
import BaseColorPanel from "./components/BaseColorPanel.vue";
import ColorPanel from "./components/ColorPanel.vue";
import getDefaultPalette from "./services/getDefaultPalette";

const data = reactive({
	colors: getDefaultPalette(),
	isBaseColorSaved: false,
	hasInit: false
});

const baseColorPanel = ref(null);

const newTheme = () => {
	if(!confirm("Your generated theme will delete! Ready for new theme?"))
		return;

	data.colors = getDefaultPalette();
	data.isBaseColorSaved = false;
	baseColorPanel.value.setupDefaultColors();
};

const saveBaseColors = baseColors => {
	data.colors.base = baseColors;
	data.hasInit = true;
};
</script>

<template>
	<div class="bg-gray-100 min-h-screen">
		<BrandHeader @newTheme="newTheme" />
		<main class="container">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
				<BaseColorPanel ref="baseColorPanel" title="Base Color" :defaultColors="data.colors.base" :hasInit="data.hasInit" @submit="saveBaseColors" />
			</div>
		</main>
	</div>
</template>
