<script>
import { PlusIcon } from "@heroicons/vue/solid";
import FormSelectColorKey from "./FormSelectColorKey.vue";
import FormChooseColor from "./FormChooseColor.vue";

export default {
	components: { FormSelectColorKey, FormChooseColor, PlusIcon },
	props: {
		disabledKeys: Array
	},
	emits: ['add'],
	computed: {
		keyOption(){
			return Array.from(Array(9).keys()).map(item => {
				const val = Number((item + 1) * 100).toString();
				const disabled = this.disabledKeys.map(k => k.toString()).indexOf(val) >= 0;

				return { val, disabled };
			});
		}
	},
	data(){
		return {
			key: "",
			showFormSelectColorKey: false,
			showColorChooser: false
		};
	},
	methods: {
		cancel(){
			this.showFormSelectColorKey = false;
			this.showColorChooser = false;
		},
		chooseColor(key){
			this.key = key;
			this.showFormSelectColorKey = false;
			this.showColorChooser = true;
		},
		addColor(colorValue){
			this.$emit('add', this.key, colorValue);
			this.showColorChooser = false;
		}
	}
};
</script>
<style scoped>
	button[disabled] { opacity: 1!important; }
</style>
<template>
	<div class="flex flex-col items-center m-2">
		<button @click="showFormSelectColorKey = true" type="button" class="rounded-full p-4 border border-gray-300 text-gray-500 transition-colors duration-200 ease-in-out btn-hovered-shadow hover:text-gray-600">
			<PlusIcon class="w-8 h-8" />
		</button>
	</div>
	<FormSelectColorKey v-if="showFormSelectColorKey" :keyOption="keyOption" @submit="chooseColor" @cancel="cancel" />
	<FormChooseColor v-if="showColorChooser" @submit="addColor" @cancel="cancel" />
</template>
