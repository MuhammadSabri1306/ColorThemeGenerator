<script>
import PanelColor from "./PanelColor.vue";
import FixedModal from "./ui/FixedModal.vue";
import { PlusIcon } from "@heroicons/vue/solid";

import newColorName from "./modules/newColorName";

export default {
	components: { PanelColor, FixedModal, PlusIcon },
	data(){
		return {
			newColorModal: {
				value: "",
				show: false,
				valid: true
			}
		};
	},
	computed: {
		colors(){
			return this.$store.state.colors;
		}
	},
	methods: {
		setBaseColor({ key, val }){
			this.$store.commit("updateBaseColor", { key, val });
		},
		setHalfColor({ name, key, val }){
			console.log(key);
			this.$store.commit("updateHalfColor", { name, val });
		},
		setPrimaryColorNode({ key, val }){
			this.$store.commit("updatePaletteColor", { name: "primary", key, val });
		},
		removePrimaryColorNode({ key }){
			this.$store.commit("updatePaletteColor", { name: "primary", key });
		},
		setOthersColorNode({ name, key, val }){
			if(!this.colors.others[name])
				return;
			this.$store.commit("updatePaletteColor", { name, key, val });
		},
		removeOthersColorNode({ name, key }){
			if(!this.colors.others[name])
				return;
			this.$store.commit("updatePaletteColor", { name, key });
		},
		destroyOthersColor(name){
			if(!this.colors.others[name])
				return;
			this.$store.commit("deleteOthersColor", name);
		},
		async newOthersColor(){
			this.newColorModal.valid = this.newColorModal.value.length > 0
				&& this.newColorModal.value.search(/[^a-z1-9]/g) < 0;
			if(!this.newColorModal.valid)
				return;

			this.newColorModal.show = false;
			this.$store.commit("updatePaletteColor", { name: this.newColorModal.value });
			this.newColorModal.value = "";

			await this.$nextTick();
			const othersColorPanelElm = document.querySelectorAll(".others-color-panel");
			othersColorPanelElm[othersColorPanelElm.length - 1].scrollIntoView();
		},
		openNewColorModal(){
			const regOthersColorsName = Object.keys(this.colors.others);
			this.newColorModal.value = newColorName(regOthersColorsName);
			this.newColorModal.show = true;
		}
	}
};
</script>
<template>
	<section>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 px-0 md:px-8 py-8">
			<PanelColor title="Primary" name="primary" :color="colors.primary" :customizable="true" @setColor="setPrimaryColorNode" @removeColor="removePrimaryColorNode" />
			<PanelColor v-for="(v, k) in colors.others" :title="k[0].toUpperCase() + k.slice(1)" :name="k" :color="v" :customizable="true" :destroyable="true" :editTitle="true" @setColor="setOthersColorNode" @removeColor="removeOthersColorNode" @destroy="destroyOthersColor" class="others-color-panel" />
			<PanelColor title="Dark" name="dark" :color="colors.dark" @setColor="setHalfColor" />
			<PanelColor title="Light" name="light" :color="colors.light" @setColor="setHalfColor" />
			<div>
				<PanelColor title="Base Color" name="base" :color="colors.base" @setColor="setBaseColor" />
			</div>
		</div>
		<div class="fixed bottom-8 md:bottom-12 lg:bottom-16 right-8 md:right-16 lg:right-32 z-[7777]">
			<button type="button" class="border border-transparent rounded-full shadow-custom-1 text-white p-3 lg:p-4 bg-indigo-600 hover:bg-indigo-700 focus:outline-none" @click="openNewColorModal">
				<PlusIcon class="w-8 h-8 lg:w-10 lg:h-10" />
			</button>
		</div>
		<FixedModal v-if="newColorModal.show" @close="newColorModal.show = false">
			<div class="flex items-center px-8">
				<label for="newColorName" class="text-gray-700 mr-4">Color's Name</label>
				<div class="flex-grow-1 grid grid-cols-1">
					<input type="text" name="newColorName" v-model="newColorModal.value" class="border rounded-md border-gray-300 px-4 py-1 text-gray-900 focus:border-gray-400 focus:outline-none" placeholder="Enter the color's name">
				</div>
			</div>
			<p v-if="!newColorModal.valid" class="text-sm text-right text-red-500 font-bold px-8 mt-2">Use alphanumeric and uppercase only!</p>
			<div class="flex justify-end px-8 mt-8">
				<button type="button" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none" @click="newOthersColor">Create</button>
			</div>
		</FixedModal>
	</section>
</template>
