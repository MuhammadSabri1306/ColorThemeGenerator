<script setup>
import { onMounted, onUnmounted } from "vue";
import { XCircleIcon } from "@heroicons/vue/solid";

defineEmits(["close"]);
onMounted(() => document.body.classList.add("fixed-backdrop"));
onUnmounted(() => document.body.classList.remove("fixed-backdrop"));
</script>
<template>
	<div class="modal"><div class="modal-wrapper">
		<div class="modal-header">
			<button type="button" class="group" @click="$emit('close')">
				<XCircleIcon class="group-hover:scale-90 transition-all duration-200 ease-in-out" />
			</button>
		</div>
		<slot></slot>
	</div></div>
</template>
<style>
	body.fixed-backdrop { overflow: hidden!important; }
</style>