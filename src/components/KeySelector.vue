<script>
import { XCircleIcon } from "@heroicons/vue/solid";
import CustomFormSelect from "./CustomFormSelect.vue";

export default {
	components: { XCircleIcon, CustomFormSelect },
	props: { keyOption: Array },
	emits: ["cancel", "submit"],
	data(){
		return {
			key: ""
		};
	},
	computed: {
		customSelectList(){
			return this.keyOption.map(item => {
				return { value: item.val, disabled: item.disabled };
			});
		}
	},
	methods: {
		formSelectFocusOut(){
			console.log("out");
		}
	}
};
</script>
<template>
	<div class="modal modal-w-auto"><div class="modal-wrapper">
		<div class="modal-header">
			<button type="button" class="group" @click="$emit('cancel')">
				<XCircleIcon class="group-hover:scale-90 transition-all duration-200 ease-in-out" />
			</button>
		</div>
		<div class="flex items-center px-8 mb-8">
			<label for="colorKey" class="text-gray-700 mr-2">Color Key</label>
			<CustomFormSelect :value="key" title="Select color key" :list="customSelectList" @change="(val) => key = val" class="custom-form-select" />
		</div>
		<div class="flex justify-end px-8">
			<button type="button" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none" @click="$emit('submit', key)">Choose Color</button>
		</div>
	</div></div>
</template>
