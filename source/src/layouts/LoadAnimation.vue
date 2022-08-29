<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isShow = computed(() => store.state.showLoadAnimation);
</script>
<template>
	<Transition name="loader" :duration="{ enter: 0, leave: 300 }">
		<div v-if="isShow" class="fixed left-0 top-0 w-screen h-screen z-[9999] flex justify-center items-center z-[9999]">
			<div class="animation-bg w-full h-full bg-indigo-700"></div>
			<div class="rotating-dots">
				<div></div><div></div><div></div>
			</div>
		</div>
	</Transition>
</template>
<style scoped>
.loader-leave-active .animation-bg,
.loader-leave-active .rotating-dots {
	transition: all 0.3s ease;
}
.loader-leave-from .animation-bg {
	margin-left: 0; margin-right: 0;
}

.loader-leave-to .animation-bg {
	margin-left: -101%; margin-right: 101%;
}

.loader-leave-from .rotating-dots {
	@apply scale-[1.1];
}

.loader-leave-to .rotating-dots {
	@apply scale-0;
}

@-webkit-keyframes rotating-dots {
	0% {
		-webkit-transform: translate(calc(var(--translate) * 1%), 0) rotateY(calc(var(--rotation, 0) * 1deg)) rotate(0deg);
		transform: translate(calc(var(--translate) * 1%), 0) rotateY(calc(var(--rotation, 0) * 1deg)) rotate(0deg);
	}
	50%, 100% {
		-webkit-transform: translate(calc(var(--translate) * 1%), 0) rotateY(calc(var(--rotation, 0) * 1deg)) rotate(180deg);
		transform: translate(calc(var(--translate) * 1%), 0) rotateY(calc(var(--rotation, 0) * 1deg)) rotate(180deg);
	}
}

@keyframes rotating-dots {
	0% {
		-webkit-transform: translate(calc(var(--translate) * 1%), 0) rotateY(calc(var(--rotation, 0) * 1deg)) rotate(0deg);
		transform: translate(calc(var(--translate) * 1%), 0) rotateY(calc(var(--rotation, 0) * 1deg)) rotate(0deg);
	}
	50%, 100% {
		-webkit-transform: translate(calc(var(--translate) * 1%), 0) rotateY(calc(var(--rotation, 0) * 1deg)) rotate(180deg);
		transform: translate(calc(var(--translate) * 1%), 0) rotateY(calc(var(--rotation, 0) * 1deg)) rotate(180deg);
	}
}

@-webkit-keyframes rotating-dots-flash {
	0%, 50% {
		visibility: visible;
	}
	50.0001%, 100% {
		visibility: hidden;
	}
}

@keyframes rotating-dots-flash {
	0%, 50% {
		visibility: visible;
	}
	50.0001%, 100% {
		visibility: hidden;
	}
}

.rotating-dots {
	--duration: 1;
	--size: 20;
	height: calc(var(--size) * 1px);
	position: absolute;
	width: calc(var(--size) * 1px);
}

.rotating-dots div {
	-webkit-animation: rotating-dots calc(var(--duration) * 1s) calc(var(--delay, 0) * 1s) infinite;
	animation: rotating-dots calc(var(--duration) * 1s) calc(var(--delay, 0) * 1s) infinite;
	height: 100%;
	position: absolute;
	-webkit-transform: translate(calc(var(--translate) * 1%), 0);
	transform: translate(calc(var(--translate) * 1%), 0);
	width: 100%;
}

.rotating-dots div:after, .rotating-dots div:before {
	background: var(--primary);
	border-radius: 100%;
	content: '';
	height: 100%;
	position: absolute;
	width: 100%;
}

.rotating-dots div:after {
	-webkit-animation: rotating-dots-flash calc(var(--duration) * 1s) calc(var(--delay, 0) * 1s) infinite steps(2);
	animation: rotating-dots-flash calc(var(--duration) * 1s) calc(var(--delay, 0) * 1s) infinite steps(2);
	-webkit-transform: translate(-100%, 0);
	transform: translate(-100%, 0);
}

.rotating-dots div:before {
	-webkit-transform: translate(100%, 0);
	transform: translate(100%, 0);
}

.rotating-dots div:nth-of-type(1) {
	--translate: -100;
	--primary: #fff;
}

.rotating-dots div:nth-of-type(2) {
	--delay: calc((var(--duration) / 2) * -1);
	--rotation: 180;
	--translate: 100;
	--primary: #fff;
}
</style>