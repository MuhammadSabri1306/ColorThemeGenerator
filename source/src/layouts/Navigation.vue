<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { AdjustmentsIcon, CodeIcon } from "@heroicons/vue/outline";
import { ColorSwatchIcon, ChevronDownIcon } from "@heroicons/vue/solid";
import FormConfirm from "../components/FormConfirm.vue";

const router = useRouter();
const route = useRoute();
const store = useStore();

const formConfirm = ref(null);
const isHomePage = computed(() => route.path === "/");
const isGeneratePage = computed(() => route.path.search("/generate") === 0);
const disableBtnNewTheme = computed(() => !store.state.hasChanged);

const backToHome = () => {
	const message = "Your generated theme will be <span class='font-bold'>deleted!</span> Continue?";
	const handler = () => {
		store.commit("setupColors");
		router.push({ path: "/" });
	};

	if(!store.state.hasChanged)
		return handler();

	formConfirm.value.confirm(message, "Back to Home").then(handler).catch(() => null);
};

const newTheme = () => {
	const message = "Your generated theme will be <span class='font-bold'>deleted!</span> Continue?";
	formConfirm.value.confirm(message, "New Theme")
		.then(() => {
			store.commit("setupColors");
			router.push({ path: "/generate/editor" });
		})
		.catch(() => null);
};

const activeClass = sectionName => {
	if(!isGeneratePage.value)
		return;

	const getClassList = isActive => isActive ? ["active"] : ["text-gray-600", "hover:text-gray-800"];

	if(!route.params.p)
		return getClassList(sectionName === "editor");

	return getClassList(sectionName === route.params.p);
};
</script>
<template>
	<div v-if="isHomePage">
		<header id="home" class="pt-6 md:pt-10">
			<div class="container">
				<div class="lg:flex lg:items-center lg:justify-between">
					<div class="flex-1 min-w-0">
						<div class="flex flex-wrap items-end">
							<ColorSwatchIcon class="h-14 w-14 text-indigo-500 mr-1" />
							<div>
								<h2 class="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:truncate">Color Theme Generator</h2>
								<p class="text-sm text-gray-500 font-semibold">Suitable for Tailwind use</p>
							</div>
						</div>
					</div>
					<div class="mt-5 flex lg:mt-0 lg:ml-4">
						<span class="mr-3">
							<a href="#more" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								<ChevronDownIcon class="-ml-1 mr-2 h-5 w-5" />Read More
							</a>
						</span>
						<span>
							<a href="https://muhammadsabri1306.github.io/" target="_blank" class="relative inline-flex items-center pl-12 pr-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								<img src="/assets/meow-icon.png" class="absolute w-6 h-6 left-4 top-1/2 -translate-y-1/2" alt="My cat illustration icon" />About Me
							</a>
						</span>
					</div>
				</div>
			</div>
		</header>
	</div>
	<div v-else-if="isGeneratePage" >
		<header class="bg-white border-b md:border-b-0 border-gray-300">
			<div class="container flex pt-6 md:pt-10 pb-3 md:pb-10">
				<a href="/" @click.prevent="backToHome" class="flex justify-center items-end mx-auto">
					<ColorSwatchIcon class="h-10 w-10 text-indigo-500 mr-1" />
					<h2 class="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:truncate">Color Theme Generator</h2>
				</a>
			</div>
		</header>
		<nav class="sticky w-full left-0 top-0 bg-white border-b border-gray-300 overflow-hidden z-[6666]">
			<div class="md:container flex flex-1 overflow-x-auto overflow-y-hidden justify-center md:justify-start">
				<div class="flex items-end -mb-px">
					<button class="btn-navigation text-gray-600 hover:text-gray-800" :disabled="disableBtnNewTheme" @click="$emit('navigate', 0)">
						<ColorSwatchIcon class="icon" />
						<span class="inline-block font-semibold text-sm">New Theme</span>
					</button>
					<router-link to="/generate/editor" class="btn-navigation" :class="activeClass('editor')">
						<AdjustmentsIcon class="icon" />
						<span class="inline-block font-semibold text-sm">Palettes</span>
					</router-link>
					<router-link to="/generate/tailwind" class="btn-navigation" :class="activeClass('tailwind')">
						<CodeIcon class="icon" />
						<span class="inline-block font-semibold text-sm">Tailwind</span>
					</router-link>
					<router-link to="/generate/css" class="btn-navigation" :class="activeClass('css')">
						<CodeIcon class="icon" />
						<span class="inline-block font-semibold text-sm">CSS</span>
					</router-link>
				</div>
			</div>
		</nav>
	</div>
	<FormConfirm ref="formConfirm" />
</template>