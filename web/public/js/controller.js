
var controller = {

    latestAction : function(match) {
        browser.getNextPage()
    },

    latestV1Action : function(match) {
        browser.switchApiVersion(1)
        browser.getNextPage()
    },

    latestV2Action : function(match) {
        browser.switchApiVersion(2)
        browser.getNextPage()
    },

    authorMapsAction : function(match) {
        var map_code = match[1]

        browser.loadAuthorMapsV1(map_code)
    },

    authorMapsV2Action : function(match) {
        var map_code = match[1] + "-" + match[2]

        browser.loadAuthorMapsV2(map_code)
    },

    topDownloadsAction : function(match) {
        browser.loadTopDownloadedMapsV1()
    },

    topDownloadsV2Action : function(match) {
        browser.loadTopDownloadedMapsV2()
    }
}
