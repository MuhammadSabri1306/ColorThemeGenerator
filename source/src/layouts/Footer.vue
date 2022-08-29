<script setup>
import IconSocial from "../components/IconLoader.vue";
</script>
<template>
	<footer>
		<div class="container">
			<div class="flex flex-col md:flex-row justify-center md:justify-between items-center">
				<p class="text-gray-300 text-center text-sm pt-16 md:pt-8 pb-8 px-12 md:px-0">&copy; Color Theme Generator by <a href="#" class="font-semibold text-gray-200 transition-colors duration-200 ease-in-out hover:text-indigo-500">Muhammad Sabri</a>. 2022</p>
				<div class="flex justify-center items-center py-8">
					<a href="mailto:muhammadsabri1306@gmail.com" class="social-link" target="_blank">
						<IconSocial icon="SolidEnvelopeIcon" />
					</a>
					<a href="https://github.com/MuhammadSabri1306" class="social-link" target="_blank">
						<IconSocial icon="solid-github-icon" />
					</a>
					<a href="https://www.linkedin.com/in/sabri-muhammad-3355061a3/" class="social-link" target="_blank">
						<IconSocial icon="solid-linkedin-icon" />
					</a>
					<a href="https://www.instagram.com/initial.sa/" class="social-link" target="_blank">
						<IconSocial icon="solid-instagram-icon" />
					</a>
				</div>
			</div>
		</div>
	</footer>
</template>