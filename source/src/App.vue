<script setup>
import { ref, computed } from "vue";
import PageHome from "./components/PageHome.vue";
import PageGenerate from "./components/PageGenerate.vue";
import SolidEnvelopeIcon from "./components/IconSocial/SolidEnvelopeIcon.vue";
import SolidGithubIcon from "./components/IconSocial/SolidGithubIcon.vue";
import SolidInstagramIcon from "./components/IconSocial/SolidInstagramIcon.vue";
import SolidLinkedinIcon from "./components/IconSocial/SolidLinkedinIcon.vue";
import simpleRouter from "./services/simpleRouter";

if(simpleRouter.getPageId() === "e404")
	simpleRouter.redirectTo("/");

const showPage = ref(simpleRouter.getPageId());

const isHomePage = computed(() => showPage.value == "home");
const isGeneratePage = computed(() => showPage.value == "generate");
const isE404Page = computed(() => showPage.value == "e404");

const redirectToGenerate = () => {
	simpleRouter.redirectTo("/generate", () => {
		showPage.value = "generate";
	});
};

const redirectToHome = () => {
	simpleRouter.redirectTo("/", () => {
		showPage.value = "home";
	});
};
</script>
<template>
<div class="bg-gray-100 min-h-screen">
	<PageHome v-if="isHomePage" @newTheme="redirectToGenerate" />
	<PageGenerate v-if="isGeneratePage" @cancel="redirectToHome" />
	<footer v-if="!isE404Page" class="bg-gray-900">
		<div class="container">
			<div class="flex flex-col md:flex-row justify-center md:justify-between items-center">
				<p class="text-gray-300 text-center text-sm pt-16 md:pt-8 pb-8 px-12 md:px-0">&copy; Color Theme Generator by <a href="#" class="font-semibold text-gray-200 transition-colors duration-200 ease-in-out hover:text-indigo-500">Muhammad Sabri</a>. 2022</p>
				<div class="flex justify-center items-center py-8">
					<a href="#" class="social-link">
						<SolidEnvelopeIcon />
					</a>
					<a href="#" class="social-link">
						<SolidGithubIcon />
					</a>
					<a href="#" class="social-link">
						<SolidLinkedinIcon />
					</a>
					<a href="#" class="social-link">
						<SolidInstagramIcon />
					</a>
				</div>
			</div>
		</div>
	</footer>
</div>
</template>
