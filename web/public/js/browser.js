
var browser = {
    api_version : 1,

    load_button : null,
    load_spinner : null,
    box_container : null,
    map_box_template : null,
    logo_button : null,

    switch_link : null,
    latest_link : null,
    top_downloads_link : null,

    last_loaded_id : null,

    init : function (configuration) {
        browser.load_button = $("#load_more button")
        browser.load_spinner = $("#spinner")
        browser.box_container = $("#listing")
        browser.map_box_template = $("#listing .template")
        browser.logo_button = $("#logo_button")

        browser.switch_link = $("#switch_link")
        browser.latest_link = $("#latest_link")
        browser.top_downloads_link = $("#top_downloads_link")

        browser.map_box_template.detach()
        browser.map_box_template.removeClass('template')

        browser.load_button.bind('click', browser.getNextPage)
        browser.logo_button.bind('click', browser.reloadLatest)

        browser.switch_link.bind('click', function(event) {
            event.preventDefault()
            browser.autoSelectVersion()
        })

        browser.latest_link.bind('click', function(event) {
            event.preventDefault()
            browser.reloadLatest()
        })

        browser.top_downloads_link.bind('click', function(event) {
            event.preventDefault()
            browser.loadTopDownloadedMaps()
        })

        browser.load_spinner.hide()
    },

    getNextPage : function() {
        browser.load_button.hide()
        browser.load_spinner.show()

        if (browser.api_version == 1) {
            base_url = '/maps/listing'
        } else {
            base_url = '/v2/maps/listing'
        }

        if (browser.last_loaded_id === null) {
            $.get(base_url, browser.appendLoadedData)
        } else {
            $.get(base_url + browser.last_loaded_id, browser.appendLoadedData)
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
        if (browser.api_version == 1) {
            thumb_url = 'public/thumbs/'
        } else {
            thumb_url = 'public/thumbs/v2/'
        }

        var new_box = browser.map_box_template.clone()
        new_box.find('.nameAnchor').text(data['name'])
        new_box.find('.createdAnchor').text(data['created'])
        new_box.find('.codeAnchor').text(data['code'])
        new_box.find('.downloadsAnchor').text(data['downloads'])
        new_box.find('.imageAnchor').attr("src", thumb_url + data['code'] + ".png")
        new_box.find('.moreAuthor').bind('click', function (event) {
            event.preventDefault()
            browser.loadAuthorMaps(data['code'])
        })
        new_box.find('.moreAuthor').attr('href', '/browser/author_' + data['code'] + '.html')

        return new_box
    },

    loadInterfaceV1 : function() {
        browser.switch_link.attr('href', './v2.html')
        browser.switch_link.text('Switch to ToF II')
        browser.top_downloads_link.attr('href', './top_downloads.html')
        browser.logo_button.attr('class', 'v1')
    },
    loadInterfaceV2 : function() {
        browser.switch_link.attr('href', './v1.html')
        browser.switch_link.text('Switch to ToF')
        browser.top_downloads_link.attr('href', './top_downloads_v2.html')
        browser.logo_button.attr('class', 'v2')
    },

    reloadInterface : function() {
        if (browser.api_version == 1) {
            browser.loadInterfaceV1()
        } else {
            browser.loadInterfaceV2()
        }
    },

    autoSelectVersion : function() {
        if (browser.api_version == 1) {
            browser.switchApiVersion(2)
        } else {
            browser.switchApiVersion(1)
        }
        browser.reloadLatest()
    },

    switchApiVersion : function(version) {
        browser.api_version = version
        browser.reloadInterface()
    },

    reloadLatest : function() {
        browser.clear()
        browser.last_loaded_id = null
        browser.getNextPage()
    },

    clear : function() {
        browser.box_container.empty()
    },

    loadAuthorMaps : function(map_code) {
        browser.clear()
        browser.load_button.hide()
        browser.load_spinner.show()

        if (browser.api_version == 1) {
            base_url = '/maps/author/'
        } else {
            base_url = '/v2/maps/author/'
        }

        $.get('/maps/author/' + map_code, browser.appendLoadedData)
    },

    loadAuthorMapsV1 : function(map_code) {
        browser.switchApiVersion(1)
        browser.loadAuthorMaps(map_code)
    },

    loadAuthorMapsV2 : function(map_code) {
        browser.switchApiVersion(2)
        browser.loadAuthorMaps(map_code)
    },

    loadTopDownloadedMaps : function() {
        browser.clear()
        browser.load_button.hide()
        browser.load_spinner.show()

        if (browser.api_version == 1) {
            base_url = '/maps/top/downloads'
        } else {
            base_url = '/v2/maps/top/downloads'
        }

        $.get('/maps/top/downloads', browser.appendLoadedData)
    },

    loadTopDownloadedMapsV1 : function() {
        browser.switchApiVersion(1)
        browser.loadTopDownloadedMaps()
    },

    loadTopDownloadedMapsV2 : function() {
        browser.switchApiVersion(2)
        browser.loadTopDownloadedMaps()
    }
}
