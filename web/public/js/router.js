
var router = {
    api_location : null,

    routes : [
        {
            name : "latest",
            match : "browser/$",
        },
        {
            name : "latestV1",
            match : "v1.html",
        },
        {
            name : "latestV2",
            match : "v2.html",
        },
        {
            name : "authorMaps",
            match : "author_([a-zA-Z0-9]*).html",
        },
        {
            name : "authorMapsV2",
            match : "author_([a-zA-Z0-9]*)-([0-9]*).html",
        },
        {
            name : "topDownloads",
            match : "top_downloads.html",
        },
        {
            name : "topDownloadsV2",
            match : "top_downloads_v2.html",
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