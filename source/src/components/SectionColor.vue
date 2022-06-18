<script>
import ColorPanel from "./ColorPanel.vue";
import FixedModal from "./FixedModal.vue";
import { PlusIcon } from "@heroicons/vue/solid";

import defaultPalette from "./../models/defaultPalette";
import generateHalfColors from "./../services/generateHalfColors";
import generateColors from "./../services/generateColors";
import newColorName from "./../services/newColorName";

export default {
	components: { ColorPanel, FixedModal, PlusIcon },
	data(){
		return {
			colors: {},
			newColorModal: {
				value: "",
				show: false,
				valid: true
			}
		};
	},
	created(){
		this.setup();
	},
	methods: {
		setup(){
			const dPalette = JSON.parse(JSON.stringify(defaultPalette));
			const halfColors = generateHalfColors(dPalette.half.light, dPalette.half.dark);

			const base = { custom: dPalette.base },
				dark = halfColors.dark,
				light = halfColors.light,
				primary = generateColors(dPalette.primary),
				others = {};
			this.colors = { base, dark, light, primary, others };
		},
		changeBaseColor({ key, val }){
			this.colors.base.custom[key] = val;
		},
		changeHalfColor({ name, key, val }){
			if(["light", "dark"].indexOf(name) < 0)
				return;

			const prevColors = {
				light: this.colors.light.custom[100],
				dark: this.colors.dark.custom[900]
			};
			prevColors[name] = val;

			const halfColors = generateHalfColors(prevColors.light, prevColors.dark);
			this.colors.light = halfColors.light;
			this.colors.dark = halfColors.dark;
		},
		updateColor(params){
			const { name, key } = params;
			let colors = params.isPrimary ? this.colors[name].custom : this.colors.others[name].custom;

			if(params.isSetOpr){
				const { val } = params;
				colors[key] = val;
			}
			else delete colors[key];

			if(params.isPrimary)
				this.colors[name] = generateColors(colors);
			else
				this.colors.others[name] = generateColors(colors);
		},
		changePrimaryColor(sendedData){
			this.updateColor({ isSetOpr:true, isPrimary:true, ...sendedData });
		},
		removePrimaryColor(sendedData){
			this.updateColor({ isSetOpr:false, isPrimary:true, ...sendedData });
		},
		changeOthersColor(sendedData){
			this.updateColor({ isSetOpr:true, isPrimary:false, ...sendedData });
		},
		removeOthersColor(sendedData){
			this.updateColor({ isSetOpr:false, isPrimary:false, ...sendedData });
		},
		destroyOthersColor(name){
			delete this.colors.others[name];
		},
		newOthersColor(){
			this.newColorModal.valid = this.newColorModal.value.length > 0
				&& this.newColorModal.value.search(/[^a-z1-9]/g) < 0;
			if(!this.newColorModal.valid)
				return;

			this.newColorModal.show = false;
			this.colors.others[this.newColorModal.value] = generateColors();
			this.newColorModal.value = ""
		},
		openNewColorModal(){
			this.newColorModal.value = newColorName(Object.keys(this.colors.others));
			this.newColorModal.show = true;
		}
	}
};
</script>
<template>
	<section>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 px-0 md:px-8 py-8">
			<ColorPanel title="Primary" name="primary" :colors="colors.primary" :customizable="true" @setColor="changePrimaryColor" @removeColor="removePrimaryColor" />
			<ColorPanel v-for="(v, k) in colors.others" :title="k[0].toUpperCase() + k.slice(1)" :name="k" :colors="v" :customizable="true" :destroyable="true" :editTitle="true" @setColor="changeOthersColor" @removeColor="removeOthersColor" @destroy="destroyOthersColor" />
			<ColorPanel title="Dark" name="dark" :colors="colors.dark" @setColor="changeHalfColor" />
			<ColorPanel title="Light" name="light" :colors="colors.light" @setColor="changeHalfColor" />
			<div>
				<ColorPanel title="Base Color" name="base" :colors="colors.base" @setColor="changeBaseColor" />
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
