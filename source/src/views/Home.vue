<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { onBeforeRouteLeave } from "vue-router";

import SectionHero from "@/components/SectionHero.vue";
import IconSocial from "@/components/IconLoader.vue";
import SectionPaletteSuggestions from "@/components/SectionPaletteSuggestions.vue";

const mainElm = ref(null);
onBeforeRouteLeave((to, from, next) => {
	mainElm.value.style.opacity = 0.7;
	return next();
});

const store = useStore();
onMounted(() => {
	if(store.state.loadAnimation.show)
		store.commit("loadAnimation/set", false);
});
</script>
<template>
<main ref="mainElm">
	<article>
		<section class="container">
			<div class="flex p-4 md:px-24 justify-center items-center mt-32">
				<SectionHero class="opacity-90" />
			</div>
			<div id="more">
				<h4 class="text-4xl text-center font-black text-gray-800 mt-6 mb-6">What i am?</h4>
				<div class="flex flex-col justify-center items-center">
					<p class="text-lg text-gray-700 text-center md:leading-8 md:w-2/3 mb-4">Hi! I will support you to build great <strong>Palette Theme</strong>. Create your own palette with more shades you can customize and apply to your apps. You can get the result as <strong>CSS Color Custom Properties</strong> (--*) or <strong><i>tailwind.config.js</i></strong> if you are familiar with  Tailwind CSS.</p>
					<router-link to="/generate/editor" class="px-8 py-3 border border-transparent rounded-md shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">New Theme</router-link>
				</div>
			</div>
			<div class="flex justify-center mt-16 lg:mt-32 mb-32 lg:mb-48">
				<div class="relative border rounded-md border-gray-300">
					<a href="https://github.com/MuhammadSabri1306/ColorThemeGenerator" class="inline-flex items-center whitespace-nowrap px-4 py-3 text-xl hover:text-2xl text-gray-800 hover:text-indigo-700 transition-all duration-200 ease-in-out">
						<IconSocial icon="solid-git-alt" class="ml-auto mr-1" />
						<span class="inline-block md:hidden font-semibold text-base">https://github.com/MuhammadS...</span>
						<span class="hidden md:inline-block font-semibold text-base">https://github.com/MuhammadSabri1306/ColorThemeGenerator</span>
					</a>
					<span class="absolute left-4 -top-5 p-2 text-xs font-semibold bg-gray-100 text-gray-600">Repository</span>
				</div>
			</div>
		</section>
		<SectionPaletteSuggestions class="container py-32" />
		<section class="container hidden">
			<h6 class="text-gray-700 text-center font-medium text-lg md:text-2xl mb-5 md:mb-16 md:px-4 lg:px-8">Build from</h6>
			<div class="flex justify-center">
				<a href="https://vuejs.org/" target="_blank" class="inline-flex flex-col lg:flex-row items-center text-sm font-semibold mx-5 md:mx-8 lg:mx-12 text-gray-700 group transition-colors duration-200 ease-in-out hover:text-gray-800">
					<span class="grow inline-flex">
						<img src="/assets/vue-logo.png" class="w-12 md:w-24 my-auto drop-shadow-md scale-100 transition-all duration-200 ease-in-out group-hover:scale-90" alt="Vue.js logo">
					</span>
					<span class="mt-4 lg:mt-5">Vue.js</span>
				</a>
				<a href="https://vuejs.org/" target="_blank" class="inline-flex flex-col lg:flex-row items-center text-sm font-semibold mx-5 md:mx-8 lg:mx-12 text-gray-700 group transition-colors duration-200 ease-in-out hover:text-gray-800">
					<span class="grow inline-flex">
						<img src="/assets/tailwind-css-logo.png" class="w-12 md:w-24 my-auto drop-shadow-md scale-100 transition-all duration-200 ease-in-out group-hover:scale-90" alt="Tailwind CSS logo">
					</span>
					<span class="mt-4 lg:mt-5 lg:ml-1">Tailwind CSS</span>
				</a>
			</div>
		</section>
	</article>
</main>
</template>