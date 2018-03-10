
var router = {
    api_location : null,

    routes : [
        {
            name : "latest",
            match : "browser/$",
        },
        {
            name : "authorMaps",
            match : "author_([a-zA-Z0-9]*).html",
        },
        {
            name : "topDownloads",
            match : "top_downloads.html",
        },
    ],

    init : function (configuration) {
        router.api_location = configuration.api_location
    },

    getRoute : function(href) {
        var match = []
        var route = router.routes[0]

        for (var i = 0; i < router.routes.length; i++) {
            route = router.routes[i]
            match = router.testRoute(route, href)

            if (match.length > 0) {
                break
            } else {
                route = router.routes[0]
            }
        }

        return {
            route : route,
            match : match,
        }
    },

    testRoute : function(route, href) {
        var results = new RegExp(route.match).exec(href)

        if (results == null) {
            return []
        }

        return results
    }
}