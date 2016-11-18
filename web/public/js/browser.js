
var browser = {
    api_location : null,

    init : function (configuration) {
        this.api_location = configuration.api_location
    }
}

$(document).ready(function() {
    browser.init(configuration)
});