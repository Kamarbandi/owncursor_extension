class Localize {
    init() {
        $("[data-i18n]").each(function (element) {
            let message = chrome.i18n.getMessage($(this).attr('data-i18n'));
            $(this).html(message)
        })
    }
}