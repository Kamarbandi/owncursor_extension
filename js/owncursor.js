// class Cursors {
//     constructor() {
//         this.size = 3;
//         this.cssOnlyPointer = `
//             [type="search"]::-webkit-search-cancel-button, [type="search"]::-webkit-search-decoration { url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto  !important;}
//             :link, :visited {cursor: url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto !important;}
//             a > * {url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto !important;}
//             ::-webkit-scrollbar-button {cursor: url("#pointer#") #pointerOffsetX# #pointerOffsetY#,  auto !important;}
//             ::-webkit-file-upload-button{cursor:url("#pointer#") #pointerOffsetX# #pointerOffsetY#,  auto !important;}
//             `;
//
//         this.cssOnlyCursor = `
//             body {cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto !important;}
//             input[type="date"], input[type="time"], input[type="datetime-local"], input[type="month"] { cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto !important;}
//             input::-webkit-contacts-auto-fill-button {cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto  !important;}
//             input:read-only {cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto !important; }
//         `;
//         this.css = `
//                 .ogdlpmhglpejoiomcodnpjnfgcpmgale_default, body, html {cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY# , auto !important;}
//                 input[type="date"], input[type="time"], input[type="datetime-local"], input[type="month"] {cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto !important;}
//                 [type="search"]::-webkit-search-cancel-button, [type="search"]::-webkit-search-decoration { url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto  !important;}
//                 input::-webkit-contacts-auto-fill-button {cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto  !important;}
//                 .paper-button, .ytp-progress-bar-container, input[type=submit], :link, :visited {cursor: url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto !important;}
//                 a > * {url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto !important;}
//                 input:read-only {cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY# , auto !important; }
//                 img, button {url("#pointer#")  #pointerOffsetX# #pointerOffsetY#, auto !important; }
//                 ::-webkit-scrollbar-button {cursor: url("#pointer#") #pointerOffsetX# #pointerOffsetY#,  auto !important;}
//                 .ogdlpmhglpejoiomcodnpjnfgcpmgale_pointer, ::-webkit-file-upload-button{cursor:url("#pointer#") #pointerOffsetX# #pointerOffsetY#,  auto !important;}
//                 button, .ytp-volume-panel{cursor:url("#pointer#") #pointerOffsetX# #pointerOffsetY#,  auto !important;}
//                 #ownegaaclefjebommgaonjmddkofgjnildl .icon { cursor: url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto !important; }
//
//                 `;
//         this.cssCustom = `
//                * {cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto !important;}
//                 a, img{url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto !important;}
//                 input[type="date"], input[type="time"], input[type="datetime-local"], input[type="month"] {cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto !important;}
//                 [type="search"]::-webkit-search-cancel-button, [type="search"]::-webkit-search-decoration {url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto  !important;}
//                 input::-webkit-contacts-auto-fill-button {cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto  !important;}
//                 :link, :visited {cursor:  url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto !important;}
//                 a > * { url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto !important;}
//                 input:read-only {cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto !important; }
//                 button {url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto !important; }
//                 ::-webkit-scrollbar-button {url("#pointer#") #pointerOffsetX# #pointerOffsetY#,  auto !important;}
//                 ::-webkit-file-upload-button{url("#pointer#") #pointerOffsetX# #pointerOffsetY#,  auto !important;}`
//         ;
//
//
//         this.sheet = (function () {
//             let el = document.createElement('style');
//             el.appendChild(document.createTextNode(''));
//             el.type = 'text/css';
//             el.rel = 'stylesheet';
//             el.media = 'all';
//             el.id = "own";
//             document.head.appendChild(el);
//             return el;
//         })();
//
//         chrome.storage.onChanged.addListener(function (changes, area) {
//             if (area == 'local') {
//                 this.getSelected();
//             }
//         }.bind(this));
//
//         this.getSelected();
//
//         chrome.extension.onMessage.addListener(function (request, sender, sendResponseParam) {
//             if (request.action == "update") {
//                 this.getSelected()
//             }
//             if (request.action == "clear") {
//                 this.sheet.innerHTML = "";
//             }
//         }.bind(this))
//     }
//
//     getSelected() {
//         chrome.storage.local.get(null, function (item) {
//             if (item.selected_type == 'none') {
//                 this.sheet.innerHTML = "";
//             }
//             this.selected = item.selected;
//             this.size = item.size;
//             this.init();
//         }.bind(this))
//     }
//
//     init() {
//         if (this.selected) {
//             let percentOffset = 3;
//             switch (this.size) {
//                 case 1:
//                     percentOffset = 8; //16x16
//                     break;
//                 case 2:
//                     percentOffset = 5.33; //24x24
//                     break;
//                 case 3:
//                     percentOffset = 4; //32x32
//                     break;
//                 case 4:
//                     percentOffset = 3.2; //40x40
//                     break;
//                 case 5:
//                     percentOffset = 2.66; //48x48
//                     break;
//                 case 6:
//                     percentOffset = 2.28; //56x56
//                     break;
//                 case 7:
//                     percentOffset = 2; //64x64
//                     break;
//                 case 8:
//                     percentOffset = 1.33; //72x72 //96
//                 case 9:
//                     percentOffset = 1; //80x80 /128
//                 case 10:
//                     percentOffset = 0.5; //88x88 //256
//                 case 11:
//                     percentOffset = 1.33; //96x96
//             }
//
//             if (!this.selected.pointer.offsetX) {
//                 this.selected.pointer.offsetX = 0;
//                 this.selected.pointer.offsetY = 0;
//                 this.selected.cursor.offsetX = 0;
//                 this.selected.cursor.offsetY = 0;
//             }
//
//             this.selected.pointer.offsetX = Math.floor(this.selected.pointer.offsetX / percentOffset);
//             this.selected.pointer.offsetY = Math.floor(this.selected.pointer.offsetY / percentOffset);
//             this.selected.cursor.offsetX = Math.floor(this.selected.cursor.offsetX / percentOffset);
//             this.selected.cursor.offsetY = Math.floor(this.selected.cursor.offsetY / percentOffset);
//
//
//             if (this.selected.type == "system") {
//
//                 if (typeof(this.selected.pointer.path) == "undefined") {
//                     this.tmpCss = this.cssOnlyCursor;
//                 } else
//                 if (typeof(this.selected.cursor.path) == "undefined") {
//                     this.tmpCss = this.cssOnlyPointer;
//                 } else {
//                     this.tmpCss = this.css;
//                 }
//
//                 this.tmpCss = this.tmpCss.replace(/#pointer#/g, this.selected.pointer.path);
//                 this.tmpCss = this.tmpCss.replace(/#cursor#/g, this.selected.cursor.path);
//                 this.tmpCss = this.tmpCss.replace(/#size#/g, this.size);
//
//                 this.tmpCss = this.tmpCss.replace(/#pointerOffsetX#/g, this.selected.pointer.offsetX);
//                 this.tmpCss = this.tmpCss.replace(/#pointerOffsetY#/g, this.selected.pointer.offsetY);
//                 this.tmpCss = this.tmpCss.replace(/#cursorOffsetX#/g, this.selected.cursor.offsetX);
//                 this.tmpCss = this.tmpCss.replace(/#cursorOffsetY#/g, this.selected.cursor.offsetY);
//
//                 this.sheet.innerHTML = this.tmpCss;
//             }
//             if (this.selected.type == "custom") {
//
//                 if (typeof(this.selected.pointer.path) == "undefined") {
//                     this.tmpCss = this.cssOnlyCursor;
//                     this.tmpCss = this.tmpCss.replace(/#cursor#/g, this.selected.cursor.path);
//                     this.tmpCss = this.tmpCss.replace(/#size#/g, this.size);
//
//                     this.tmpCss = this.tmpCss.replace(/#cursorOffsetX#/g, this.selected.cursor.offsetX);
//                     this.tmpCss = this.tmpCss.replace(/#cursorOffsetY#/g, this.selected.cursor.offsetY);
//
//
//                     this.sheet.innerHTML = this.tmpCss;
//
//                 } else if (typeof(this.selected.cursor.path) == "undefined") {
//
//                     this.tmpCss = this.cssOnlyPointer;
//                     this.tmpCss = this.tmpCss.replace(/#pointer#/g, this.selected.pointer.path);
//                     this.tmpCss = this.tmpCss.replace(/#size#/g, this.size);
//
//                     this.tmpCss = this.tmpCss.replace(/#pointerOffsetX#/g, this.selected.pointer.offsetX);
//                     this.tmpCss = this.tmpCss.replace(/#pointerOffsetY#/g, this.selected.pointer.offsetY);
//
//
//                     this.sheet.innerHTML = this.tmpCss;
//                 } else {
//                     this.tmpCss = this.cssCustom;
//                     this.tmpCss = this.tmpCss.replace(/#cursor#/g, this.selected.cursor.path);
//                     this.tmpCss = this.tmpCss.replace(/#pointer#/g, this.selected.pointer.path);
//
//                     this.tmpCss = this.tmpCss.replace(/#pointerOffsetX#/g, this.selected.pointer.offsetX);
//                     this.tmpCss = this.tmpCss.replace(/#pointerOffsetY#/g, this.selected.pointer.offsetY);
//                     this.tmpCss = this.tmpCss.replace(/#cursorOffsetX#/g, this.selected.cursor.offsetX);
//                     this.tmpCss = this.tmpCss.replace(/#cursorOffsetY#/g, this.selected.cursor.offsetY);
//
//                     this.tmpCss = this.tmpCss.replace(/#size#/g, this.size);
//                     this.sheet.innerHTML = this.tmpCss;
//                 }
//             }
//
//         } else {
//             this.sheet.innerHTML = "";
//         }
//
//         $("*").on('hover', function (e) {
//             if ($(e.target).css('cursor') == "pointer" && !$(e.target).hasClass('ogdlpmhglpejoiomcodnpjnfgcpmgale_pointer')) {
//                 $(e.target).addClass('ogdlpmhglpejoiomcodnpjnfgcpmgale_pointer');
//             }
//             if ($(e.target).css('cursor') == "default" && !$(e.target).hasClass('ogdlpmhglpejoiomcodnpjnfgcpmgale_default')) {
//                 $(e.target).addClass('ogdlpmhglpejoiomcodnpjnfgcpmgale_default');
//             }
//
//         }.bind(this));
//     }
//
// }
//
// let c = new Cursors();

var sizeNumber = 3;
var cssOnlyPointer = `
            [type="search"]::-webkit-search-cancel-button, 
            [type="search"]::-webkit-search-decoration {
                 url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto  !important;
            }
            :link, 
            :visited {
                cursor: url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto !important;
            }
            a > * {
                url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto !important;
            }
            ::-webkit-scrollbar-button {
                cursor: url("#pointer#") #pointerOffsetX# #pointerOffsetY#,  auto !important;
            }
            ::-webkit-file-upload-button{
                cursor:url("#pointer#") #pointerOffsetX# #pointerOffsetY#,  auto !important;
            }
`;
var cssOnlyCursor = `
            body {
                cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto !important;
            }
            input[type="date"], 
            input[type="time"], 
            input[type="datetime-local"], 
            input[type="month"] { 
                cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto !important;
            }
            input::-webkit-contacts-auto-fill-button {
                cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto  !important;
            }
            input:read-only {
                cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto !important; 
            }
`;
var cssMain = `                                                                               
            .ogdlpmhglpejoiomcodnpjnfgcpmgale_default, 
            body, 
            html {
                cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY# , auto !important;
            }              
            input[type="date"], 
            input[type="time"], 
            input[type="datetime-local"], 
            input[type="month"] {
                cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto !important;
            }                                                                              
            [type="search"]::-webkit-search-cancel-button, 
            [type="search"]::-webkit-search-decoration { 
                url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto  !important;
            }                
            input::-webkit-contacts-auto-fill-button {
                cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto  !important;
            }                
            .paper-button, 
            .ytp-progress-bar-container, 
            input[type=submit], 
            :link, 
            :visited {
                cursor: url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto !important;
            }                
            a > * {
                url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto !important;
            }                               
            input:read-only {
                cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY# , auto !important; 
            }               
            img, 
            button {
                url("#pointer#")  #pointerOffsetX# #pointerOffsetY#, auto !important; 
            }                              
            ::-webkit-scrollbar-button {
                cursor: url("#pointer#") #pointerOffsetX# #pointerOffsetY#,  auto !important;
            }                
            .ogdlpmhglpejoiomcodnpjnfgcpmgale_pointer, 
            ::-webkit-file-upload-button{
                cursor:url("#pointer#") #pointerOffsetX# #pointerOffsetY#,  auto !important;
            }
            button, 
            .ytp-volume-panel{
                cursor:url("#pointer#") #pointerOffsetX# #pointerOffsetY#,  auto !important;
            }
            #mybmlgmhlpjbjpbnjcaijinadglbdipnkl .icon { 
                cursor: url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto !important; 
            }
                                
`;
var cssCustom = `      
               * {
                   cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto !important;
                }
                a, 
                img{
                    url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto !important;
                }                
                input[type="date"], 
                input[type="time"], 
                input[type="datetime-local"], 
                input[type="month"] {
                    cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto !important;
                }
                [type="search"]::-webkit-search-cancel-button, 
                [type="search"]::-webkit-search-decoration {
                    url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto  !important;
                }               
                input::-webkit-contacts-auto-fill-button {
                    cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto  !important;
                }               
                :link, 
                :visited {
                    cursor:  url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto !important;
                }                
                a > * { 
                    url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto !important;
                }                               
                input:read-only {
                    cursor: url("#cursor#") #cursorOffsetX# #cursorOffsetY#, auto !important; 
                }                
                button {
                    url("#pointer#") #pointerOffsetX# #pointerOffsetY#, auto !important; 
                }                                                                              
                ::-webkit-scrollbar-button {
                    url("#pointer#") #pointerOffsetX# #pointerOffsetY#,  auto !important;
                }                
                ::-webkit-file-upload-button{
                    url("#pointer#") #pointerOffsetX# #pointerOffsetY#,  auto !important;
                }
`;
var sheet = (function() {
    let el = document.createElement('style');
    el.appendChild(document.createTextNode(''));
    el.type = 'text/css';
    el.rel = 'stylesheet';
    el.media = 'all';
    el.id = "my";
    document.head.appendChild(el);
    return el;
})();
var selected;
var getSelected = function() {
    chrome.storage.local.get(null, function(item) {
        if (item.selected_type == 'none') {
            sheet.innerHTML = "";
        }
        selected = item.selected;
        sizeNumber = item.size;
        initCursor();
    });
}
var initCursor = function() {
    if (selected) {
        let percentOffset = 3;
        switch (sizeNumber) {
            case 1:
                percentOffset = 8; //16x16
                break;
            case 2:
                percentOffset = 5.33; //24x24
                break;
            case 3:
                percentOffset = 4; //32x32
                break;
            case 4:
                percentOffset = 3.2; //40x40
                break;
            case 5:
                percentOffset = 2.66; //48x48
                break;
            case 6:
                percentOffset = 2.28; //56x56
                break;
            case 7:
                percentOffset = 2; //64x64
                break;
            case 8:
                percentOffset = 1.33; //72x72 //96
            case 9:
                percentOffset = 1; //80x80 /128
            case 10:
                percentOffset = 0.5; //88x88 //256
            case 11:
                percentOffset = 1.33; //96x96
        }
        if (!selected.pointer.offsetX) {
            selected.pointer.offsetX = 0;
            selected.pointer.offsetY = 0;
            selected.cursor.offsetX = 0;
            selected.cursor.offsetY = 0;
        }
        selected.pointer.offsetX = Math.floor(selected.pointer.offsetX / percentOffset);
        selected.pointer.offsetY = Math.floor(selected.pointer.offsetY / percentOffset);
        selected.cursor.offsetX = Math.floor(selected.cursor.offsetX / percentOffset);
        selected.cursor.offsetY = Math.floor(selected.cursor.offsetY / percentOffset);
        let tmpCss = cssMain;
        if (selected.type == "system") {
            if (typeof(selected.pointer.path) == "undefined") {
                tmpCss = cssOnlyCursor;
            } else if (typeof(selected.cursor.path) == "undefined") {
                tmpCss = cssOnlyPointer;
            } else {
                tmpCss = cssMain;
            }
            tmpCss = tmpCss.replace(/#pointer#/g, selected.pointer.path);
            tmpCss = tmpCss.replace(/#cursor#/g, selected.cursor.path);
            tmpCss = tmpCss.replace(/#size#/g, sizeNumber);
            tmpCss = tmpCss.replace(/#pointerOffsetX#/g, selected.pointer.offsetX);
            tmpCss = tmpCss.replace(/#pointerOffsetY#/g, selected.pointer.offsetY);
            tmpCss = tmpCss.replace(/#cursorOffsetX#/g, selected.cursor.offsetX);
            tmpCss = tmpCss.replace(/#cursorOffsetY#/g, selected.cursor.offsetY);
            sheet.innerHTML = tmpCss;
        }
        if (selected.type == "custom") {
            if (typeof(selected.pointer.path) == "undefined") {
                tmpCss = cssOnlyCursor;
                tmpCss = tmpCss.replace(/#cursor#/g, selected.cursor.path);
                tmpCss = tmpCss.replace(/#size#/g, sizeNumber);
                tmpCss = tmpCss.replace(/#cursorOffsetX#/g, selected.cursor.offsetX);
                tmpCss = tmpCss.replace(/#cursorOffsetY#/g, selected.cursor.offsetY);
                sheet.innerHTML = tmpCss;
            } else if (typeof(selected.cursor.path) == "undefined") {
                tmpCss = cssOnlyPointer;
                tmpCss = tmpCss.replace(/#pointer#/g, selected.pointer.path);
                tmpCss = tmpCss.replace(/#size#/g, sizeNumber);
                tmpCss = tmpCss.replace(/#pointerOffsetX#/g, selected.pointer.offsetX);
                tmpCss = tmpCss.replace(/#pointerOffsetY#/g, selected.pointer.offsetY);
                sheet.innerHTML = tmpCss;
            } else {
                tmpCss = cssCustom;
                tmpCss = tmpCss.replace(/#cursor#/g, selected.cursor.path);
                tmpCss = tmpCss.replace(/#pointer#/g, selected.pointer.path);
                tmpCss = tmpCss.replace(/#pointerOffsetX#/g, selected.pointer.offsetX);
                tmpCss = tmpCss.replace(/#pointerOffsetY#/g, selected.pointer.offsetY);
                tmpCss = tmpCss.replace(/#cursorOffsetX#/g, selected.cursor.offsetX);
                tmpCss = tmpCss.replace(/#cursorOffsetY#/g, selected.cursor.offsetY);
                tmpCss = tmpCss.replace(/#size#/g, sizeNumber);
                sheet.innerHTML = tmpCss;
            }
        }
    } else {
        sheet.innerHTML = "";
    }
    $("*")
        .on('hover', function(e) {
            if ($(e.target)
                .css('cursor') == "pointer" && !$(e.target)
                .hasClass('ogdlpmhglpejoiomcodnpjnfgcpmgale_pointer')) {
                $(e.target)
                    .addClass('ogdlpmhglpejoiomcodnpjnfgcpmgale_pointer');
            }
            if ($(e.target)
                .css('cursor') == "default" && !$(e.target)
                .hasClass('ogdlpmhglpejoiomcodnpjnfgcpmgale_default')) {
                $(e.target)
                    .addClass('ogdlpmhglpejoiomcodnpjnfgcpmgale_default');
            }
        });
}
var Cursors = (function() {
    chrome.storage.onChanged.addListener(function(changes, area) {
        if (area == 'local') {
            getSelected();
        }
    });
    getSelected();
    chrome.extension.onMessage.addListener(function(request, sender, sendResponseParam) {
        if (request.action == "update") {
            getSelected()
        }
        if (request.action == "clear") {
            sheet.innerHTML = "";
        }
    });
})();