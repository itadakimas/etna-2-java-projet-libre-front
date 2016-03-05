/*
 * Dependencies
 */
import Events from "modules/core/events.js";
import Router from "modules/core/router.js";

export function init()
{
  var router = new Router([
    {
      name: "home",
      uri: "/home"
    },
    {
      name: "login",
      uri: "/login"
    }
  ], window.location);
  router.setDefaultRoute("home");
  router.onRouteChange(function(route) {
    Events.emit("router:update", route);
  });
  router.init();
}