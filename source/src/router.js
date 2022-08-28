import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";

const useBuildPath = false;
const basepath = useBuildPath ? "/ColorThemeGenerator/" : "/";

export default createRouter({
    history: createWebHistory(basepath),
    routes: [
        { path: "/", component: Home },
        { path: "/generate/:p", component: () => import("./views/Generate.vue") },
        { path: "/generate/:p/:themeId", component: () => import("./views/Generate.vue") }
    ],
    scrollBehavior(to, from, savedPosition){
        if(savedPosition)
            return savedPosition;
        else return { top: 0 };
    }
});