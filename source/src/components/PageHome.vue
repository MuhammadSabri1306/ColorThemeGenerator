<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { ColorSwatchIcon, ChevronDownIcon } from "@heroicons/vue/solid";

const heroWrapper = ref(null);
const hero = ref(null);
let heroDefaultHeight = 0;

const data = reactive({
	heroHeight: 0
});

const getCalc = targetName => {
	const calculation = {
		scrollRate: (window.innerHeight > window.innerWidth) ? window.scrollY * 3.5 / 4 : window.scrollY,
		defaultHeight: (window.innerHeight > window.innerWidth) ? heroWrapper.value.offsetWidth : heroWrapper.value.offsetWidth / 2
	};

	return calculation[targetName];
};

const heroOnScroll = () => {
	if(getCalc("scrollRate") <= heroDefaultHeight)
		data.heroHeight = heroDefaultHeight - getCalc("scrollRate");
	else data.heroHeight = 0;
};

onMounted(() => {
	heroDefaultHeight = getCalc("defaultHeight");
	data.heroHeight = heroDefaultHeight - getCalc("scrollRate");
	window.addEventListener("scroll", heroOnScroll);
});

onUnmounted(() => window.removeEventListener("scroll", heroOnScroll));
</script>

<style scoped>
.hero-wrapper { aspect-ratio: 2 / 1; }

@media (orientation: portrait) {
	.hero-wrapper { aspect-ratio: 1 / 1; }
}

.hero {
	background-image: url(/assets/galaxy.webp), linear-gradient(#ddd, #000), radial-gradient(transparent, #000);
    background-repeat: no-repeat;
    background-size: 100% auto, 100%, 100%;
    background-position: 50%;
    background-blend-mode: hard-light;
    transition: height 0.2s;
}

@media (orientation: portrait) {
	.hero { background-size: 150% auto, 100%, 100%; }
}
</style>

<template>
<main>
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
	<article>
		<section class="container pt-32 pb-64">
			<div class="flex p-4 md:px-24 justify-center items-center">
				<div ref="heroWrapper" class="hero-wrapper relative w-full lg:w-2/3 rounded-2xl lg:rounded-md overflow-hidden opacity-90">
					<div ref="hero" class="hero absolute w-full left-0 top-0 rounded-b-2xl lg:rounded-b-md" :style="{ height: data.heroHeight + 'px' }">&nbsp;</div>
				</div>
			</div>
			<div id="more">
				<h4 class="text-4xl text-center font-black text-gray-800 mt-6 mb-6">What i am?</h4>
				<div class="flex flex-col justify-center items-center">
					<p class="text-lg text-gray-700 text-center md:leading-8 md:w-2/3 mb-4">Hi! I will support you to build great <strong>Palette Theme</strong>. Create your own palette with more shades you can customize and apply to your apps. You can get the result as <strong>CSS Color Custom Properties</strong> (--*) or <strong><i>tailwind.config.js</i></strong> if you are familiar with  Tailwind CSS.</p>
					<a href="#generate" class="px-8 py-3 border border-transparent rounded-md shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">New Theme</a>
				</div>
			</div>
		</section>
		<section class="container pb-32">
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
