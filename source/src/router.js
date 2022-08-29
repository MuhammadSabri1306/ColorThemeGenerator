import { createRouter, createWebHistory } from "vue-router";

const useBuildPath = false;

const defineMyRouter = routes => {
    const basepath = useBuildPath ? "/ColorThemeGenerator/" : "/";
    const history = createWebHistory(basepath);

    return createRouter({
        history,
        routes,
        scrollBehavior(to, from, savedPosition){
            if(savedPosition)
                return savedPosition;
            else return { top: 0 };
        }
    });
};

export default defineMyRouter([
    { path: "/", component: () => import("./views/Home.vue") },
    { path: "/generate/:p", component: () => import("./views/Generate.vue") },
    { path: "/generate/:p/:themeId", component: () => import("./views/Generate.vue") }
]);