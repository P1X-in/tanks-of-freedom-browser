
var browser = {
    api_location : null,
    load_button : null,
    load_spinner : null,
    box_container : null,
    map_box_template : null,
    logo_button : null,

    last_loaded_id : null,

    init : function (configuration) {
        browser.api_location = configuration.api_location;
        browser.load_button = $("#load_more button");
        browser.load_spinner = $("#spinner");
        browser.box_container = $("#listing");
        browser.map_box_template = $("#listing .template")
        browser.logo_button = $("#logo_button")

        browser.map_box_template.detach()
        browser.map_box_template.removeClass('template')

        browser.load_button.bind('click', browser.getNextPage)
        browser.logo_button.bind('click', browser.reloadLatest)

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
        var array_length = data['maps'].length;
        for (var i = 0; i < array_length; i++) {
            if (browser.last_loaded_id === null || browser.last_loaded_id > data['maps'][i]['id']) {
                browser.last_loaded_id = data['maps'][i]['id'];
            }
            browser.box_container.append(browser.buildMapBox(data['maps'][i]));
        }
        browser.load_spinner.hide()
        if (browser.last_loaded_id > 0 && array_length == 20) {
            browser.load_button.show();
        }
    },

    buildMapBox : function(data) {
        var new_box = browser.map_box_template.clone()
        new_box.find('.nameAnchor').text(data['name'])
        new_box.find('.createdAnchor').text(data['created'])
        new_box.find('.codeAnchor').text(data['code'])
        new_box.find('.downloadsAnchor').text(data['downloads'])
        new_box.find('.imageAnchor').attr("src", "public/img/" + data['code'] + ".png")

        return new_box
    },

    reloadLatest : function() {
        browser.clear()
        browser.last_loaded_id = null
        browser.getNextPage()
    },

    clear : function() {
        browser.box_container.clear()
    }
}

$(document).ready(function() {
    browser.init(configuration);

    browser.getNextPage()
});