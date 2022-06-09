<script>
import { XCircleIcon } from "@heroicons/vue/solid";

export default {
	components: { XCircleIcon },
	props: { keyOption: Array },
	emits: ["cancel", "submit"],
	data(){
		return {
			key: ""
		};
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
			<select v-model="key" name="colorKey" class="border rounded-md border-gray-300 px-4 py-1 text-gray-900 focus:border-gray-400 focus:outline-none">
				<option disabled value="">Select color key</option>
				<option v-for="item in keyOption" :disabled="item.disabled">{{ item.val }}</option>
			</select>
		</div>
		<div class="flex justify-end px-8">
			<button type="button" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none" @click="$emit('submit', key)">Choose Color</button>
		</div>
	</div></div>
</template>
