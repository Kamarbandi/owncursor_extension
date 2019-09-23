class LanguageLocal {
    init() {
        $("[data-aju23]").each(function (element) {
            let message = chrome.i18n.getMessage($(this).attr('data-aju23'));
            $(this).html(message)
        })
    }
}