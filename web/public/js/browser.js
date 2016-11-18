
var browser = {
    api_location : null,
    load_button : null,
    load_spinner : null,
    box_container : null,

    last_loaded_id : null,

    init : function (configuration) {
        this.api_location = configuration.api_location;
        this.load_button = $("#load_more button");
        this.load_spinner = $("#spinner");
        this.box_container = $("#listing");

        this.load_spinner.hide()
    },

    getNextPage : function() {
        this.load_button.hide()
        this.load_spinner.show()
        if (this.last_loaded_id === null) {
            $.get(this.api_location + '/maps/listing', this.appendLoadedData)
        } else {
            $.get(this.api_location + '/maps/listing/' + this.last_loaded_id, this.appendLoadedData)
        }
    },

    appendLoadedData : function(data) {
        var arrayLength = data['maps'].length;
        for (var i = 0; i < arrayLength; i++) {
            if (browser.last_loaded_id === null || browser.last_loaded_id > data['maps'][i]['id']) {
                browser.last_loaded_id = data['maps'][i]['id'];
            }
            browser.box_container.appendChild($("<div class='map'><h3>" + data['maps'][i]['name'] + "</h3><span class='created'>" + data['maps'][i]['created'] + "</span><span class='code'>" + data['maps'][i]['code'] + "</span></div>"));
        }
        browser.load_spinner.hide()
        if (browser.last_loaded_id > 0) {
            browser.load_button.show();
        }
    }
}

$(document).ready(function() {
    browser.init(configuration);

    browser.getNextPage()
});