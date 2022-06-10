<script>
import { LockClosedIcon, LockOpenIcon, MinusCircleIcon } from "@heroicons/vue/solid";
import ColorInput from "./ColorInput.vue";
import ColorCircle from "./ColorCircle.vue";
import ColorAdd from "./ColorAdd.vue";

export default {
	components: {
		LockClosedIcon,
		LockOpenIcon,
		MinusCircleIcon,
		ColorInput,
		ColorCircle,
		ColorAdd
	},
	props: {
		title: String,
		lock: Boolean,
		name: String,
		colors: Object,
		customizable: Boolean
	},
	emits: ["setColor", "removeColor"],
	data(){
		return {
			isLocked: false
		};
	},
	computed: {
		colorCustom(){
			return this.colors.custom;
		},
		colorRange(){
			return this.colors.generated;
		},
		availableKey(){
			return Object.keys(this.colors.custom);
		},
		canUseAdd(){
			return this.customizable && Object.keys(this.colorCustom).length < 9;
		},
		canUseRemove(){
			return this.customizable && Object.keys(this.colorCustom).length > 1 ;
		}
	},
	created(){
		this.initData();
	},
	methods: {
		initData(){
			this.isLocked = false;
			this.isLocked = this.lock;
		},
		changeIsLocked(){
			this.isLocked = !this.isLocked;
		},
		setColor(key, val){
			const name = this.name;
			this.$emit("setColor", { name, key, val });
		},
		removeColor(key){
			const name = this.name;
			this.$emit("removeColor", { name, key });
		}
	}
};
</script>
<style scoped>
	.closed-icon, .open-icon {
		@apply w-4 h-4 transition-colors duration-200 ease-in-out;
	}
</style>
<template>
	<div class="color-panel">
		<div class="flex justify-between items-start mb-12">
			<h4 class="text-lg font-bold leading-6 text-gray-700 sm:text-xl sm:truncate">{{ title }}</h4>
			<button type="button" @click="changeIsLocked()">
				<LockClosedIcon v-if="isLocked" class="closed-icon text-gray-500 hover:text-gray-600" />
				<LockOpenIcon v-if="!isLocked" class="open-icon text-gray-400 hover:text-gray-600" />
			</button>
		</div>
		<div v-if="isLocked" class="flex flex-wrap justify-start items-start mb-4">
			<ColorCircle v-for="(colorVal, colorKey) in colorCustom" :color="colorVal" :label="colorKey" :circleClassList="['w-16', 'h-16']" :labelClassList="['text-gray-600', 'text-sm', 'font-semibold']" class="m-2" />
		</div>
		<div v-else class="flex flex-wrap justify-start items-start mb-4">
			<div v-for="(colorVal, colorKey) in colorCustom" class="relative">
				<ColorInput :colorName="colorKey" :color="colorVal" @changeColor="setColor" />
				<button v-if="canUseRemove" class="absolute top-0 right-0 text-gray-400 transition-colors duration-200 ease-in-out hover:text-gray-600" @click="removeColor(colorKey)">
					<MinusCircleIcon class="w-6 h-6" />
				</button>
			</div>
			<ColorAdd v-if="canUseAdd" :disabledKeys="availableKey" @add="setColor" />
		</div>
		<div class="flex flex-wrap justify-start items-start">
			<ColorCircle v-for="(colorVal, colorKey) in colorRange" :color="colorVal" :label="colorKey" :circleClassList="['w-12', 'h-12']" :labelClassList="['text-gray-600', 'text-sm', 'font-semibold']" class="m-2" />
		</div>
	</div>
</template>
