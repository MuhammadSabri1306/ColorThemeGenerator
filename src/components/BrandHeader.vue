<script>
import { reactive } from "vue";
import { ColorSwatchIcon, PencilIcon, CodeIcon, CheckIcon, ChevronDownIcon } from "@heroicons/vue/solid";

export default {
	components: {
		ColorSwatchIcon, PencilIcon, CodeIcon, CheckIcon, ChevronDownIcon
	},
	emits: ["newTheme", "showTailwindConfig", "showCSS"],
	data(){
		return {
			expandMenuState: -1
		};
	},
	methods: {
		expandMenu(){
			this.expandMenuState = 0;
			setTimeout(() => {
				this.expandMenuState = 1;
			}, 100);
		},
		hideMenu(){
			this.expandMenuState = 0;
			setTimeout(() => {
				this.expandMenuState = -1;
			}, 300);
		}
	}
};
</script>
<template>
	<header class="pt-6 pb-10 md:pt-10">
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
					<span class="hidden sm:block">
						<button @click="$emit('newTheme')" type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							<PencilIcon class="-ml-1 mr-2 h-5 w-5 text-gray-500" />New Theme
						</button>
					</span>
					<span class="hidden sm:block ml-3">
						<button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							<CodeIcon class="-ml-1 mr-2 h-5 w-5 text-gray-500" />Tailwind Config
						</button>
					</span>
					<span class="sm:ml-3">
						<button type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							<CheckIcon class="-ml-1 mr-2 h-5 w-5" />View CSS
						</button>
					</span>
					<div class="ml-3 relative sm:hidden" @focusout="hideMenu()">
						<button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="mobile-menu-button" aria-expanded="false" aria-haspopup="true" @click="expandMenu()">
							More<ChevronDownIcon class="-mr-1 ml-2 h-5 w-5 text-gray-500" />
						</button>
						<div class="menu origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" :class="{ hide: (expandMenuState >= 0), show: (expandMenuState == 1) }" role="menu" aria-orientation="vertical" aria-labelledby="mobile-menu-button" tabindex="-1">
							<a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="mobile-menu-item-0">New Theme</a>
							<a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="mobile-menu-item-1">Tailwind Config</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>
