
var app = {
    run : function() {
        router.init(configuration)
        browser.init(configuration)

        app.handleRequest()
    },

    handleRequest : function() {
        var href = window.location.href
        var route = router.getRoute(href)

        app.executeRoute(route)
    },

    executeRoute : function(route) {
        var routeName = route.route.name + "Action"

        var action = controller[routeName]

        if (typeof action === "function") {
            action(route.match)
        } else {
            app.mobileFallback(route)
        }
    },

    mobileFallback : function(route) {
        if (route.route.name === "latest") {
            controller.latestAction(route.match)
        } else if (route.route.name === "authorMaps") {
            controller.authorMapsAction(route.match)
        } else if (route.route.name === "topDownloads") {
            controller.topDownloadsAction(route.match)
        }
    }
}

$(document).ready(function() {
    app.run()
});