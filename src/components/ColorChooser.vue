<script>
import twPalette from "./../models/tailwindPalette";
import searchAlgorithm from "./../services/searchAlgorithm";
import FixedModal from "./FixedModal.vue";
import ColorCircle from "./ColorCircle.vue";

export default {
	components: { FixedModal, ColorCircle },
	emits: ["submit", "cancel"],
	data(){
		return {
			twSearchName: "",
			twColorSelected: { name: "", color: ""},
			activeTabs: {
				twPalette: true,
				customColor: false
			},
			value: ""
		};
	},
	computed: {
		twSearchList(){
			if(this.twSearchName.length <= 0)
				return [];

			return searchAlgorithm(this.twSearchName, twPalette);
		}
	},
	methods: {
		switchTab(activeT){
			if(this.activeTabs[activeT] == true) return;

			Object.keys(this.activeTabs).forEach(tab => {
				this.activeTabs[tab] = tab == activeT;
			});
		},
		chooseTailwindColor(twColor){
			this.twColorSelected.name = twColor.name;
			this.twColorSelected.color = this.value = twColor.color;

			this.twSearchName = "";
		},
		submit(){
			if(this.value.length < 1) return;
			this.$emit("submit", this.value);
		}
	},
	mounted(){
		if(this.activeTabs.customColor && this.value.length < 1)
			this.value = "#000000";
		else if(this.activeTabs.twPalette){
			this.$refs.twSearchInput.focus();
		}
	}
};
</script>
<template>
	<FixedModal @close="$emit('cancel')">
		<div class="grid grid-cols-2 mb-6 px-8">
			<button @click="switchTab('twPalette')" type="button" class="px-4 py-2 border border-indigo-600 rounded-l-md shadow-sm text-sm font-medium hover:bg-indigo-700 hover:border-indigo-700 hover:text-white focus:outline-none" :class="{ 'bg-indigo-600 text-white': activeTabs.twPalette, 'bg-gray-100 text-indigo-600': activeTabs.customColor }">Tailwind Palette</button>
			<button @click="switchTab('customColor')" type="button" class="px-4 py-2 border border-indigo-600 rounded-r-md shadow-sm text-sm font-medium hover:bg-indigo-700 hover:border-indigo-700 hover:text-white focus:outline-none" :class="{ 'bg-indigo-600 text-white': activeTabs.customColor, 'bg-gray-100 text-indigo-600': activeTabs.twPalette }">Custom Color</button>
		</div>
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<div class="lg:border-r lg:border-r-gray-200">
				<div v-if="activeTabs.twPalette">
					<div class="grid grid-cols-1 mb-4 px-8">
						<input type="text" v-model="twSearchName" ref="twSearchInput" class="border rounded-md border-gray-300 px-4 py-1 text-gray-900 focus:border-gray-400 focus:outline-none" placeholder="Search Tailwind's color">
					</div>
					<div class="flex flex-col items-stretch" :class="{ hidden: twSearchName.length < 1 }">
						<button v-for="(twColor, index) in twSearchList" @click="chooseTailwindColor(twColor)" type="button" class="flex justify-between items-center border-x lg:border-r-0 border-gray-200 bg-white px-8 py-1 hover:bg-gray-100" :class="{ 'border-t': index > 0 }">
							<span class="text-gray-500 text-sm font-semibold">{{ twColor.name }}</span>
							<ColorCircle :color="twColor.color" :circleClassList="['w-8', 'h-8']" />
						</button>
					</div>
				</div>
				<div v-else>
					<div class="flex flex-wrap items-center mb-4 px-8">
						<label for="color-input" class="text-gray-500">Select Color</label>
						<input type="color" v-model="value" class="grow ml-4 border rounded-md border-gray-300 h-8 bg-transparent cursor-pointer transition-all duration-100 ease-in-out hover:scale-110 hover:border-white focus:outline-none">
					</div>
				</div>
			</div>
			<div class="flex flex-col justify-stretch">
				<div v-if="value.length > 0" class="flex mb-8 pl-16 pr-16 lg:pl-0 lg:flex-col lg:items-end">
					<span class="font-semibold text-gray-600 mt-8 lg:mt-4">Color Value : </span>
					<ColorCircle :color="value" :label="activeTabs.twPalette ? twColorSelected.name : value" :circleClassList="['w-16', 'h-16']" :labelClassList="['text-gray-500', 'font-semibold', 'text-sm']" />
				</div>
				<div class="flex justify-end pl-8 pr-8 mt-auto lg:pr-16">
					<button @click="submit" :disabled="value.length < 1" type="button" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">Submit</button>
				</div>
			</div>
		</div>
	</FixedModal>
</template>
