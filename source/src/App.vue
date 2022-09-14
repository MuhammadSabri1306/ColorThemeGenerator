<script setup>
import { useStore } from "vuex";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
import LoadAnimation from "./components/ui/LoadAnimation.vue";

const store = useStore();
store.commit("paletteSuggestions/init");
store.commit("setupColors");
</script>
<template>
<div class="bg-gray-100 min-h-screen flex flex-col items-stretch">
	<Navigation />
	<router-view class="grow" />
	<Footer class="bg-gray-900 mt-32" />
</div>
<LoadAnimation />
</template>
