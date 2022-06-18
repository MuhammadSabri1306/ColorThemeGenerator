<script>
import { reactive } from "vue";
import { ColorSwatchIcon, PencilIcon, ChevronDownIcon } from "@heroicons/vue/solid";

export default {
	components: {
		ColorSwatchIcon, PencilIcon, ChevronDownIcon
	},
	emits: ["newTheme"]
};
</script>
<template>
	<header class="pt-6 md:pt-10">
		<div class="container">
			<div class="lg:flex lg:items-center lg:justify-between">
				<div class="flex-1 min-w-0">
					<div class="flex flex-wrap items-end">
						<ColorSwatchIcon class="h-14 w-14 text-indigo-500 mr-1" />
						<div>
							<h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Color Theme Generator</h2>
							<p class="text-sm text-gray-500 font-semibold">Suitable for Tailwind use</p>
						</div>
					</div>
				</div>
				<div class="mt-5 flex lg:mt-0 lg:ml-4">
					<span class="mr-3">
						<button @click="$emit('newTheme')" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							<PencilIcon class="-ml-1 mr-2 h-5 w-5" />New Theme
						</button>
					</span>
					<span>
						<a href="https://muhammadsabri1306.github.io/" target="_blank" class="relative inline-flex items-center pl-12 pr-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							<img src="./../assets/img/meow.png" class="absolute w-6 h-6 left-4 top-1/2 -translate-y-1/2" />About Me
						</a>
					</span>
				</div>
			</div>
		</div>
	</header>
</template>
