<script>
import FixedModal from "./ui/FixedModal.vue";
import FormSelect from "./CustomForms/FormSelect.vue";

export default {
	components: { FixedModal, FormSelect },
	props: { keyOption: Array },
	emits: ["cancel", "submit"],
	data(){
		return {
			key: ""
		};
	},
	computed: {
		formSelectList(){
			return this.keyOption.map(item => {
				return { value: item.val, disabled: item.disabled };
			});
		}
	}
};
</script>
<template>
	<FixedModal @close="$emit('cancel')" class="modal-w-auto">
		<div class="flex items-center px-8 mb-8">
			<label for="colorKey" class="text-gray-700 mr-4">Color Key</label>
			<FormSelect :value="key" title="Select color key" :list="formSelectList" @change="(val) => key = val" class="custom-form-select" />
		</div>
		<div class="flex justify-end px-8">
			<button type="button" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none" :disabled="key.length < 1" @click="$emit('submit', key)">Choose Color</button>
		</div>
	</FixedModal>
</template>
