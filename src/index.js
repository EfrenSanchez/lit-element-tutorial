import "./styles.css";
import "./views/todo-view.js";
import { Router } from "@vaadin/router";

//Wait for the load event before registering the router. This allows the browser to render the page before we run JavaScript, and ensure that the page feels fast.
window.addEventListener("load", () => {
  initRouter();
});

function initRouter() {
  //Initialize the router and tell it to output content into the <main> section.
  const router = new Router(document.querySelector("main"));
  router.setRoutes([
    {
      path: "/",
      component: "todo-view"
    },
    {
      path: "/stats",
      component: "stats-view",
      //Use the dynamic import() syntax to only load the stats view if a user navigates to it.
      action: () => import(/* webpackChunkName: "stats" */ "./views/stats-view") //
    },
    {
      //Define a catch-all as the last route that we can use to show a "not found" pages
      path: "(.*)",
      component: "not-found-view",
      action: () =>
        import(
          /* webpackChunkName: "not-found-view" */ "./views/not-found-view"
        )
    }
  ]);
}
