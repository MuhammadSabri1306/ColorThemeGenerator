<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { ColorSwatchIcon, AdjustmentsIcon, CodeIcon } from "@heroicons/vue/outline";

defineEmits(["navigate"]);
const props = defineProps({ activeNavIndex: Number });

const activeClass = navIndex => {
	return navIndex == props.activeNavIndex ? ["active"] : ["text-gray-600", "hover:text-gray-800"];
};

const store = useStore();
const disableBtnNewTheme = computed(() => !store.state.hasChanged);
</script>
<template>
	<nav class="sticky w-full left-0 top-0 bg-white border-b border-gray-300 overflow-hidden z-[6666]">
		<div class="md:container flex flex-1 overflow-x-auto overflow-y-hidden justify-center md:justify-start">
			<div class="flex items-end -mb-px">
				<button class="btn-navigation text-gray-600 hover:text-gray-800" :disabled="disableBtnNewTheme" @click="$emit('navigate', 0)">
					<ColorSwatchIcon class="icon" />
					<span class="inline-block font-semibold text-sm">New Theme</span>
				</button>
				<button class="btn-navigation" :class="activeClass(1)" @click="$emit('navigate', 1)">
					<AdjustmentsIcon class="icon" />
					<span class="inline-block font-semibold text-sm">Palettes</span>
				</button>
				<button class="btn-navigation" :class="activeClass(2)" @click="$emit('navigate', 2)">
					<CodeIcon class="icon" />
					<span class="inline-block font-semibold text-sm">Tailwind</span>
				</button>
				<button class="btn-navigation" :class="activeClass(3)"  @click="$emit('navigate', 3)">
					<CodeIcon class="icon" />
					<span class="inline-block font-semibold text-sm">CSS</span>
				</button>
			</div>
		</div>
	</nav>
</template>
