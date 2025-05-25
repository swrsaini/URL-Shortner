import { createRoute } from "@tanstack/react-router"
import {rootRoute} from "./routeTree"
import Dashboard from "../pages/Dashboard"
import HomePage from "../pages/HomePage"

export const homepageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage 
})