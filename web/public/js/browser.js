
var browser = {
    api_location : null,
    load_button : null,
    load_spinner : null,
    box_container : null,

    last_loaded_id : null,

    init : function (configuration) {
        browser.api_location = configuration.api_location;
        browser.load_button = $("#load_more button");
        browser.load_spinner = $("#spinner");
        browser.box_container = $("#listing");

        browser.load_button.bind('click', browser.getNextPage)

        browser.load_spinner.hide()
    },

    getNextPage : function() {
        browser.load_button.hide()
        browser.load_spinner.show()
        if (browser.last_loaded_id === null) {
            $.get('/maps/listing', browser.appendLoadedData)
        } else {
            $.get('/maps/listing/' + browser.last_loaded_id, browser.appendLoadedData)
        }
    },

    appendLoadedData : function(data) {
        var arrayLength = data['maps'].length;
        for (var i = 0; i < arrayLength; i++) {
            if (browser.last_loaded_id === null || browser.last_loaded_id > data['maps'][i]['id']) {
                browser.last_loaded_id = data['maps'][i]['id'];
            }
            browser.box_container.append($("<div class='map'><h3>" + data['maps'][i]['name'] + "</h3><span class='created'>Uploaded: " + data['maps'][i]['created'] + "</span><span class='code'>Download code: <strong>" + data['maps'][i]['code'] + "</strong></span><img class='map_image' src='public/img/" + data['maps'][i]['code'] + ".png'/></div>"));
        }
        browser.load_spinner.hide()
        if (browser.last_loaded_id > 0 || arrayLength < 20) {
            browser.load_button.show();
        }
    }
}

$(document).ready(function() {
    browser.init(configuration);

    browser.getNextPage()
});