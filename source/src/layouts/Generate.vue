<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import { ColorSwatchIcon } from "@heroicons/vue/solid";
import Navigation from "./Navigation.vue";
import SectionEditor from "../components/SectionEditor.vue";
import SectionTailwindResult from "../components/SectionTailwindResult.vue";
import SectionCssResult from "../components/SectionCssResult.vue";
import FormConfirm from "../components/FormConfirm.vue";

const store = useStore();
const paletteSuggestion = computed(() => store.state.paletteSuggestion);

const route = useRoute();
const showSection = sectionName => {
	if(!route.params.p)
		return sectionName === "editor";
	return sectionName === route.params.p;
};

onMounted(() => store.commit("setShowLoadAnimation", false));
</script>
<template>
<main>
	<div class="container py-10">
		<SectionEditor v-show="showSection('editor')" />
		<SectionTailwindResult v-show="showSection('tailwind')" />
		<SectionCssResult v-show="showSection('css')" />
	</div>
</main>
</template>