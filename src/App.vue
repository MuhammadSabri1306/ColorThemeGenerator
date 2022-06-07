<script setup>
import { ref, reactive } from "vue";
import defaultPalette from "./models/defaultPalette";
import BrandHeader from "./components/BrandHeader.vue";
import ColorPanel from "./components/ColorPanel.vue";

const data = reactive({
	colors: { ...defaultPalette },
	isBaseColorSaved: false,
	isHalfColorSaved: false
});

const baseColorPanel = ref(null);
const halfColorPanel = ref(null);

const resetData = () => {
	data.colors = { ...defaultPalette };
	data.isBaseColorSaved = false;
	data.isHalfColorSaved = false;

	baseColorPanel.value.initData();
	halfColorPanel.value.initData();
};

const saveBaseColor = customColors => {
	data.colors.base = Object.entries(customColors).map(([name, hex]) => {
		return { name, hex };
	});
	data.isBaseColorSaved = true;
};

const saveHalfColor = customColors => {
	data.colors.half = Object.entries(customColors).map(([name, hex]) => {
		return { name, hex };
	});
	data.isHalfColorSaved = true;
};

const newTheme = () => {
	if(confirm("Your generated theme will delete! Ready for new theme?"))
		resetData();
};
</script>

<template>
	<div class="bg-gray-100 min-h-screen">
		<BrandHeader @newTheme="newTheme" />
		<main class="container">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
				<ColorPanel ref="baseColorPanel" title="Base Color" :defaultColors="defaultPalette.base" :isEditable="!data.isBaseColorSaved" :useNextButton="!data.isBaseColorSaved || !data.isHalfColorSaved" @saveColors="saveBaseColor" :id="1" />
				<ColorPanel ref="halfColorPanel" title="Half Color" :defaultColors="defaultPalette.half" :isEditable="data.isBaseColorSaved && !data.isHalfColorSaved" :useNextButton="!data.isBaseColorSaved || !data.isHalfColorSaved" @saveColors="saveHalfColor" />
			</div>
		</main>
	</div>
</template>
