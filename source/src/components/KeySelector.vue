<script>
import FixedModal from "./FixedModal.vue";
import CustomFormSelect from "./CustomFormSelect.vue";

export default {
	components: { FixedModal, CustomFormSelect },
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
	}
};
</script>
<template>
	<FixedModal @close="$emit('cancel')">
		<div class="flex items-center px-8 mb-8">
			<label for="colorKey" class="text-gray-700 mr-4">Color Key</label>
			<CustomFormSelect :value="key" title="Select color key" :list="customSelectList" @change="(val) => key = val" class="custom-form-select" />
		</div>
		<div class="flex justify-end px-8">
			<button type="button" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none" :disabled="key.length < 1" @click="$emit('submit', key)">Choose Color</button>
		</div>
	</FixedModal>
</template>
