<script setup>
import { XCircleIcon } from "@heroicons/vue/solid";

defineEmits(["close"]);
</script>
<template>
	<div class="modal modal-w-auto"><div class="modal-wrapper">
		<div class="modal-header">
			<button type="button" class="group" @click="$emit('close')">
				<XCircleIcon class="group-hover:scale-90 transition-all duration-200 ease-in-out" />
			</button>
		</div>
		<slot></slot>
	</div></div>
</template>
