<script setup>
import { defineAsyncComponent } from "vue";
import { useStore } from "vuex";

const store = useStore();
store.commit("setShowLoadAnimation", true);

const Home = defineAsyncComponent({
	loader: () => import("../layouts/Home.vue"),
	delay: 500
});
</script>
<template>
	<Home />
</template>