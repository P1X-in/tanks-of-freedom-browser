
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
        }
    }
}

$(document).ready(function() {
    app.run()
});