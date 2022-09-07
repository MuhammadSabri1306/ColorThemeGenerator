import { createRouter, createWebHistory } from "vue-router";

const useBuildPath = true;
const routes = {
    home: {
        path: "/",
        component: () => import("./views/Home.vue")
    },
    generate: {
        path: "/generate/:p?/:themeId?",
        component: () => import("./views/Generate.vue")
    }
};

const defineMyRouter = routesObj => {
    const routes = Object.entries(routesObj).map(([name, item]) => {
        return { name, ...item };
    });

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

export default defineMyRouter(routes);