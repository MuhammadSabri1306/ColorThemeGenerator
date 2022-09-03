<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import { ColorSwatchIcon } from "@heroicons/vue/solid";
import SectionEditor from "@/components/SectionEditor.vue";
import SectionTailwindResult from "@/components/SectionTailwindResult.vue";
import SectionCssResult from "@/components/SectionCssResult.vue";
import FormConfirm from "@/components/FormConfirm.vue";

const store = useStore();
const paletteSuggestion = computed(() => store.state.paletteSuggestion);

const route = useRoute();
const showSection = sectionName => {
	if(!route.params.p)
		return sectionName === "editor";
	return sectionName === route.params.p;
};

const mainElm = ref(null);
onBeforeRouteLeave((to, from, next) => {
	mainElm.value.style.opacity = 0.7;
	return next();
});

onMounted(() => {
	if(store.state.loadAnimation.show)
		store.commit("loadAnimation/set", false);
});
</script>
<template>
<main ref="mainElm">
	<div class="container py-10">
		<SectionEditor v-show="showSection('editor')" />
		<SectionTailwindResult v-show="showSection('tailwind')" />
		<SectionCssResult v-show="showSection('css')" />
	</div>
</main>
</template>