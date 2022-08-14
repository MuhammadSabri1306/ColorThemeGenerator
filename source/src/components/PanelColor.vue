<script>
import { LockClosedIcon, LockOpenIcon, MinusCircleIcon } from "@heroicons/vue/solid";
import { TrashIcon } from "@heroicons/vue/outline";
import ButtonChooseColor from "./ButtonChooseColor.vue";
import LabelColorCircle from "./LabelColorCircle.vue";
import ButtonAddColor from "./ButtonAddColor.vue";

export default {
	components: {
		LockClosedIcon,
		LockOpenIcon,
		MinusCircleIcon,
		TrashIcon,
		ButtonChooseColor,
		LabelColorCircle,
		ButtonAddColor
	},
	props: {
		title: String,
		lock: Boolean,
		name: String,
		color: Object,
		customizable: Boolean,
		destroyable: Boolean,
		editTitle: Boolean
	},
	emits: ["setColor", "removeColor", 'destroy'],
	data(){
		return {
			isLocked: false
		};
	},
	computed: {
		colorCustom(){
			return this.color.node;
		},
		colorRange(){
			return this.color.values;
		},
		availableKey(){
			return Object.keys(this.color.node);
		},
		canUseAdd(){
			return this.customizable && Object.keys(this.colorCustom).length < 9;
		},
		canUseRemove(){
			return this.customizable && Object.keys(this.colorCustom).length > 1 ;
		},
		titleEditableClassList(){
			if(!this.editTitle) return [];
			return ["border-b", "border-transparent", "transition-colors", "duration-200", "ease-in-out", "hover:border-gray-400", "focus:border-gray-400", "focus:outline-none"];
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
		},
		changeTitle(event){
			const title = event.target.innerText;
			console.log(title.replace(/[^a-z1-9]/gi, "").toLowerCase());
		}
	}
};
</script>
<template>
	<div class="color-panel">
		<div class="flex justify-between items-start mb-12">
			<div class="flex items-center">
				<h4 class="text-xl lg:text-lg truncate font-bold leading-6 text-gray-700" :class="titleEditableClassList" :contenteditable="editTitle" @input="changeTitle">{{ title }}</h4>
				<button type="button" class="ml-3 transition-colors duration-200 ease-in-out hover:text-gray-600" :class="{ 'text-gray-500': isLocked, 'text-gray-400': !isLocked }" @click="changeIsLocked()">
					<LockClosedIcon v-if="isLocked" class="w-4 h-4" />
					<LockOpenIcon v-else class="w-4 h-4" />
				</button>
			</div>
			<button v-if="!isLocked && destroyable" type="button" class="text-gray-400 transition-colors duration-200 ease-in-out hover:text-gray-600 -mr-6 -mt-4" @click="$emit('destroy', name)" >
				<TrashIcon class="w-5 h-5" />
			</button>
		</div>
		<div v-if="isLocked" class="flex flex-wrap justify-start items-start mb-4">
			<LabelColorCircle v-for="(colorVal, colorKey) in colorCustom" :color="colorVal" :label="colorKey" :circleClassList="['w-16', 'h-16']" :labelClassList="['text-gray-600', 'text-sm', 'font-semibold']" class="m-2" />
		</div>
		<div v-else class="flex flex-wrap justify-start items-start mb-4">
			<div v-for="(colorVal, colorKey) in colorCustom" class="relative">
				<ButtonChooseColor :colorName="colorKey" :color="colorVal" @changeColor="setColor" />
				<button v-if="canUseRemove" class="absolute top-0 right-0 text-gray-400 transition-colors duration-200 ease-in-out hover:text-gray-600" @click="removeColor(colorKey)">
					<MinusCircleIcon class="w-6 h-6" />
				</button>
			</div>
			<ButtonAddColor v-if="canUseAdd" :disabledKeys="availableKey" @add="setColor" />
		</div>
		<div class="flex flex-wrap justify-start items-start">
			<LabelColorCircle v-for="(colorVal, colorKey) in colorRange" :color="colorVal" :label="colorKey" :circleClassList="['w-12', 'h-12']" :labelClassList="['text-gray-600', 'text-sm', 'font-semibold']" class="m-2" />
		</div>
	</div>
</template>
