<script setup>
import { defineAsyncComponent } from "vue";
import { useStore } from "vuex";

const store = useStore();
store.commit("setShowLoadAnimation", true);

const Generate = defineAsyncComponent({
	loader: () => import("../layouts/Generate.vue"),
	delay: 500
});
</script>
<template>
	<Generate />
</template>