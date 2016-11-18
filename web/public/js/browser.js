
var browser = {
    api_location : null,
    load_button : null,
    load_spinner : null,

    last_loaded_id : null,

    init : function (configuration) {
        this.api_location = configuration.api_location;
        this.load_button = $("#load_more button");
        this.load_spinner = $("#spinner");

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
        console.log(data);
        this.load_spinner.hide()
        if (this.last_loaded_id > 0) {
            this.load_button.show()
        }
    }
}

$(document).ready(function() {
    browser.init(configuration);

    browser.getNextPage()
});