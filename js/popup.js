class Popup {
    constructor() {
        this.collection = {};
        this.myCollection = {};
        this.siteCollection = {};
        this.size = 3;

        chrome.storage.local.get(null, function (items) {
            this.myCollection = items.myCollection;
            this.siteCollection = items.collection;
            this.size = items.size;
            for (let index in this.siteCollection) {
                let collection = this.siteCollection[index];
                this.collection[collection.slug] = collection;
            }

            chrome.storage.local.get('selected', function (data) {
                this.selected = items.selected;
            }.bind(this));

            this.init();
            this.localize();
        }.bind(this));
        (new Localize()).init();
        console.log('constructor');
    }

    replace_i18n(obj, tag) {
        let msg = tag.replace(/__MSG_(\w+)__/g, function (match, v1) {
            return v1 ? chrome.i18n.getMessage(v1) : '';
        });
        if (msg != tag) {
            obj.innerHTML = msg;
        }
    }

    localize() {
        let data = document.querySelectorAll('[data-i18n]');
        for (let i in data)
            if (data.hasOwnProperty(i)) {
                let obj = data[i],
                    tag = obj.getAttribute('data-i18n').toString();
                this.replace_i18n(obj, tag);
            }
        let page = document.getElementsByTagName('html');
        for (let j = 0; j < page.length; j++) {
            let obj = page[j],
                tag = obj.innerHTML.toString();
            this.replace_i18n(obj, tag);
        }
    }

    init() {
        $("#listCategory").html("");
        let categoryNode = $("#listCategory");

        let cat = $(`<div class="icons-category nature normal skin-1" data-index="-1"><h1 name="myCollection"><a name="myCollection">My collection</a></h1></div>`);
        for (let image in this.myCollection) {
            let elem = null, item = this.myCollection[image];
            if (item.cursor.path) {
                elem = $(`<div class="icon">
                <img class="icon-img button cursor" data-id="${image}"  data-index="${image}"  data-cat="-1" data-category="-1" src="${item.cursor.path}"></div>`);
            } else {
                elem = $(`<div class="icon" >
                <img class="icon-img button cursor" data-id="${image}"  data-index="${image}" data-cat="-1" data-category="-1" src="${item.pointer.path}"></div>`);
            }
            cat.append(elem);
        }
        categoryNode.append(cat);
        for (let index in this.collection) {
            if (!this.collection[index]) {
                return;
            }
            let item = this.collection[index],
                cat = $(`<div class="icons-category nature normal skin-1" data-index="${index}">
                            <h1 name="${item.slug}">${item.name}</h1>
                        </div>`);
            let curIndex = index;

            try {
                item.items.forEach(function (image, i) {
                    let elem = $(`<div class="icon">
                        <img class="icon-img button lazyload cursor"
                            data-id="${i}" data-index="${i}" title="${image.name}" data-cat="${curIndex}" data-category="${item.id}"  data-src="${image.cursor.path}"
                            src="/icons/loading.gif">                
                        </div>`);
                    cat.append(elem);
                }.bind(this));
            } catch (e) {
            }
            categoryNode.append(cat);
        }


        $(".b-menu-icon__item.m-menu-icon-item-middle, .b-menu-icon").on("click", function () {
            chrome.runtime.openOptionsPage();
        });

        $(".btn-settings").on('click', function () {
            chrome.runtime.openOptionsPage();
        });

        $("#defaultCursor").on("click", function () {
            chrome.storage.local.set({"selected": null, selected_type: 'none'});
            this.reload()
            this.clear();
        }.bind(this));

        $("img.cursor").on('click', function (e) {

            let dataId = $(e.target).data('cat'),
                id = $(e.target).data('index'), item;

            console.log('dataId:'+dataId+' id:'+id);
            console.log(this.myCollection);
            console.log(this.collection);


            if (dataId == -1) {
                item = this.myCollection[id];
                item.type = item.type;
            } else {
                item = this.collection[dataId].items[id]
                item.type = 'system';
            }
            if (typeof (item.type) == 'undefined') {
                item.type = 'custom';
            }


            var size = this.size;


            let settings = {
                max_width: 24,
                max_height: 24
            };

            if (size == 1) {
                settings.max_width = 16;
                settings.max_height = 16;
            }
            if (size == 2) {
                settings.max_width = 24;
                settings.max_height = 24;
            }
            if (size == 3) {
                settings.max_width = 32;
                settings.max_height = 32;
            }
            if (size == 4) {
                settings.max_width = 48;
                settings.max_height = 48;
            }
            if (size == 5) {
                settings.max_width = 64;
                settings.max_height = 64;
            }
            if (size == 6) {
                settings.max_width = 80;
                settings.max_height = 80;
            }
            if (size == 7) {
                settings.max_width = 96;
                settings.max_height = 96;
            }
            if (size == 8) {
                settings.max_width = 128;
                settings.max_height = 128;
            }


            if(item.pointer.path) {
                if (!item.pointer.original) {
                    item.pointer.original = item.pointer.path.replace('http://owncursor.com', "");
                    item.pointer.original = item.pointer.path.replace('chrome-extension://ogdlpmhglpejoiomcodnpjnfgcpmgale', "");
                }
            }


            if(item.cursor.path){
                if (!item.cursor.original) {
                    item.cursor.original = item.cursor.path.replace('http://owncursor.com', "");
                    item.cursor.original = item.cursor.path.replace('chrome-extension://ogdlpmhglpejoiomcodnpjnfgcpmgale', "");
                }
            }

            item.render_size = size;

            if (item.type == 'custom') {
                chrome.storage.local.set({selected: item, selected_type: 'local'});
            }

            let cursor, pointer;

            if(item.pointer.path) {
                if (!item.pointer.original) {
                    item.pointer.original = item.pointer.path;
                }
                pointer = this.resizeImgData(item.pointer.original, settings.max_width, settings.max_height, 'pointer')
            }

            if(item.cursor.path) {
                if (!item.cursor.original) {
                    item.cursor.original = item.cursor.path;
                }
                cursor = this.resizeImgData(item.cursor.original, settings.max_width, settings.max_height, 'cursor')
            }

            Promise.all([ cursor, pointer]).then( (values) => {
                for(let i in values){
                    if (values[i].type == 'pointer') {
                        item.pointer.path = values[i].data
                    }
                    if (values[i].type == 'cursor') {
                        item.cursor.path = values[i].data
                    }
                }
                chrome.storage.local.set({selected: item, selected_type: 'system'});
            });

            this.reload()
        }.bind(this));
        $(".lazyload").lazyload();
    }

    clear() {
        let message = {action: 'clear'};
        chrome.storage.local.set({selected: null, selected_type: 'none'});

        chrome.runtime.sendMessage(message);
    }

    reload() {
        chrome.tabs.query({}, function (tabs) {
            let message = {action: 'update'};
            for (let i = 0; i < tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, message);
            }
        });
    }

    resizeImgData(datas, wantedWidth, wantedHeight, type) {
        return new Promise(function (resolve, reject) {
            let img = document.createElement('img');
            img.onload = function () {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                canvas.width = wantedWidth;
                canvas.height = wantedHeight;
                ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);
                let dataURI = canvas.toDataURL('image/png', 1);
                resolve({
                    type: type,
                    data: dataURI
                });
            };
            img.src = datas;
        })
    }
}

(function () {
    new Popup();
})()