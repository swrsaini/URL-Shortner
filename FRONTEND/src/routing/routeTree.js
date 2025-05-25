import { createRootRoute } from "@tanstack/react-router";
import App from "../App";
import { authRoute } from "./auth.route.js";
import { dashboardRoute } from "./dashboard.js";
import { homepageRoute } from "./HomePage.js";

export const rootRoute = createRootRoute({
    component: App 
})

export const routeTree = rootRoute.addChildren([
    authRoute,
    dashboardRoute,
    homepageRoute
])

