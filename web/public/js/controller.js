
var controller = {

    latestAction : function(match) {
        browser.getNextPage()
    },

    authorMapsAction : function(match) {
        var map_code = match[1]

        browser.loadAuthorMaps(map_code)
    },

    topDownloadsAction : function(match) {
        browser.getNextPage()
    }

}
