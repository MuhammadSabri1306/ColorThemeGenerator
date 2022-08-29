<script setup>
import { useStore } from "vuex";
import Navigation from "./layouts/Navigation.vue";
import Footer from "./layouts/Footer.vue";
import LoadAnimation from "./layouts/LoadAnimation.vue";

const store = useStore();
store.dispatch("fetchPaletteSuggestions");
store.commit("setupColors");
</script>
<template>
<div class="bg-gray-100 min-h-screen">
	<Navigation />
	<router-view />
	<Footer class="bg-gray-900" />
</div>
<LoadAnimation />
</template>
