<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const wrapperElm = ref(null);
const height = ref(0);
const style = computed(() => {
	return { height: `${ height.value }px` };
});

let defaultHeight = 0;
const getScrollRate = () => (window.innerHeight > window.innerWidth) ? window.scrollY * 3.5 / 4 : window.scrollY;
const getHeightDivider = () => (window.innerHeight > window.innerWidth) ? 1 : 2;

const onScroll = () => {
	if(getScrollRate() <= defaultHeight)
		height.value = defaultHeight - getScrollRate();
	else height.value = 0;
};

onMounted(() => {
	defaultHeight = wrapperElm.value.offsetWidth / getHeightDivider();
	height.value = defaultHeight - getScrollRate();
	window.addEventListener("scroll", onScroll);
});

onUnmounted(() => window.removeEventListener("scroll", onScroll));
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
	<div ref="wrapperElm" class="hero-wrapper relative w-full lg:w-2/3 rounded-2xl lg:rounded-md overflow-hidden">
		<div class="hero absolute w-full left-0 top-0 rounded-b-2xl lg:rounded-b-md" :style="style">&nbsp;</div>
	</div>
</template>