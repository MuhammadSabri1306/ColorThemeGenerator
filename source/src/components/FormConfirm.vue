<script>
import FixedModal from "./ui/FixedModal.vue";

export default {
	components: { FixedModal },
	data(){
		return {
			isShow: false,
			message: null,
			yesText: "OK",
			resolvePromise: null,
			rejectPromise: null
		};
	},
	methods: {
		confirm(message, yesText = null){
			this.message = message;
			if(yesText) this.yesText = yesText;
			this.isShow = true;

			return new Promise((resolve, reject) => {
				this.resolvePromise = resolve;
				this.rejectPromise = reject;
			});
		},
		answerYes(){
			this.isShow = false;
			this.resolvePromise(true);
		},
		answerNo(){
			this.isShow = false;
			this.rejectPromise(false);
		}
	}
};
</script>
<template>
	<FixedModal v-if="isShow" @close="answerNo" class="modal-w-auto">
		<div class="px-8 mb-8">
			<p v-html="message" class="text-gray-700"></p>
		</div>
		<div class="flex justify-end px-8">
			<button type="button" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none" @click="answerYes">{{ yesText }}</button>
		</div>
	</FixedModal>
</template>